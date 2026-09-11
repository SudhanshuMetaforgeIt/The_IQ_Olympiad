import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import {
  buildPaginatedResult,
  type PaginatedResult,
} from '../common/dto/pagination-query.dto.js';
import { ExamStatus } from '../common/enums/exam-status.enum.js';
import { QuestionStatus } from '../common/enums/question-status.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { OlympiadsService } from '../olympiads/olympiads.service.js';
import {
  QuestionVersion,
  type QuestionVersionDocument,
} from '../questions/schemas/question-version.schema.js';
import {
  Question,
  type QuestionDocument,
} from '../questions/schemas/question.schema.js';
import type {
  CreateExamDto,
  ExamQuestionDto,
  ExamSectionDto,
  ListExamsQueryDto,
  UpdateExamDto,
  UpdateExamStatusDto,
} from './dto/exams.dto.js';
import {
  ExamVersion,
  type ExamVersionDocument,
} from './schemas/exam-version.schema.js';
import {
  Exam,
  type ExamDocument,
  type ExamQuestion,
  type ExamSection,
} from './schemas/exam.schema.js';
import { validateOfficialExamForPublish } from './validators/official-exam-publish.validator.js';

type ExamFilter = Record<string, unknown>;

const ALLOWED_STATUS_TRANSITIONS: Record<ExamStatus, ExamStatus[]> = {
  [ExamStatus.DRAFT]: [ExamStatus.PUBLISHED],
  [ExamStatus.PUBLISHED]: [ExamStatus.SCHEDULED],
  [ExamStatus.SCHEDULED]: [ExamStatus.ONGOING],
  [ExamStatus.ONGOING]: [ExamStatus.COMPLETED],
  [ExamStatus.COMPLETED]: [ExamStatus.ARCHIVED],
  [ExamStatus.ARCHIVED]: [],
};

const REQUIRED_MARKS_PER_QUESTION = 2;

@Injectable()
export class ExamsService {
  constructor(
    @InjectModel(Exam.name)
    private readonly examModel: Model<ExamDocument>,
    @InjectModel(ExamVersion.name)
    private readonly examVersionModel: Model<ExamVersionDocument>,
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(QuestionVersion.name)
    private readonly questionVersionModel: Model<QuestionVersionDocument>,
    private readonly olympiadsService: OlympiadsService,
  ) {}

  async create(user: AuthUser, dto: CreateExamDto): Promise<ExamDocument> {
    this.assertSuperAdmin(user);
    await this.olympiadsService.findById(dto.olympiadId);
    this.assertValidWindow(new Date(dto.startsAt), new Date(dto.endsAt));

    const sections = this.normalizeSections(dto.sections ?? []);
    const questions = this.normalizeQuestions(dto.questions ?? []);
    const questionDocs = await this.loadApprovedQuestions(questions);
    this.assertDraftStructure({
      sections,
      questions,
      questionDocs,
      totalMarks: dto.totalMarks,
      totalQuestions: dto.totalQuestions,
    });

    return this.examModel.create({
      olympiadId: dto.olympiadId,
      title: dto.title.trim(),
      description: dto.description?.trim(),
      durationMinutes: dto.durationMinutes,
      totalMarks: dto.totalMarks,
      totalQuestions: dto.totalQuestions,
      sections,
      questions,
      startsAt: new Date(dto.startsAt),
      endsAt: new Date(dto.endsAt),
      status: ExamStatus.DRAFT,
    });
  }

  async list(
    user: AuthUser,
    query: ListExamsQueryDto,
  ): Promise<PaginatedResult<ExamDocument>> {
    this.assertSuperAdmin(user);

    const filter: ExamFilter = {};
    if (query.status) {
      filter.status = query.status;
    }
    if (query.olympiadId) {
      filter.olympiadId = query.olympiadId;
    }
    if (query.search?.trim()) {
      const pattern = new RegExp(this.escapeRegex(query.search.trim()), 'i');
      filter.$or = [{ title: pattern }, { description: pattern }];
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const [items, total] = await Promise.all([
      this.examModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.examModel.countDocuments(filter).exec(),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async getById(user: AuthUser, examId: string): Promise<ExamDocument> {
    this.assertSuperAdmin(user);
    return this.findExam(examId);
  }

  async update(
    user: AuthUser,
    examId: string,
    dto: UpdateExamDto,
  ): Promise<ExamDocument> {
    this.assertSuperAdmin(user);

    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    const exam = await this.findExam(examId);
    if (exam.status !== ExamStatus.DRAFT) {
      throw new BadRequestException(
        `${exam.status} exams cannot be edited`,
      );
    }

    if (dto.olympiadId) {
      await this.olympiadsService.findById(dto.olympiadId);
      exam.olympiadId = new Types.ObjectId(dto.olympiadId);
    }
    if (dto.title !== undefined) {
      exam.title = dto.title.trim();
    }
    if (dto.description !== undefined) {
      exam.description = dto.description.trim();
    }
    if (dto.durationMinutes !== undefined) {
      exam.durationMinutes = dto.durationMinutes;
    }
    if (dto.sections !== undefined) {
      exam.sections = this.normalizeSections(dto.sections);
    }
    if (dto.questions !== undefined) {
      exam.questions = this.normalizeQuestions(dto.questions);
    }

    const startsAt = dto.startsAt ? new Date(dto.startsAt) : exam.startsAt;
    const endsAt = dto.endsAt ? new Date(dto.endsAt) : exam.endsAt;
    this.assertValidWindow(startsAt, endsAt);
    exam.startsAt = startsAt;
    exam.endsAt = endsAt;

    const questionDocs = await this.loadApprovedQuestions(exam.questions);
    const nextTotalQuestions =
      dto.questions !== undefined
        ? exam.questions.length
        : (dto.totalQuestions ?? exam.totalQuestions);
    const nextTotalMarks =
      dto.questions !== undefined
        ? exam.questions.reduce((sum, question) => sum + question.marks, 0)
        : (dto.totalMarks ?? exam.totalMarks);

    if (dto.questions === undefined && dto.totalQuestions !== undefined) {
      exam.totalQuestions = dto.totalQuestions;
    } else {
      exam.totalQuestions = nextTotalQuestions;
    }
    if (dto.questions === undefined && dto.totalMarks !== undefined) {
      exam.totalMarks = dto.totalMarks;
    } else {
      exam.totalMarks = nextTotalMarks;
    }

    this.assertDraftStructure({
      sections: exam.sections,
      questions: exam.questions,
      questionDocs,
      totalMarks: exam.totalMarks,
      totalQuestions: exam.totalQuestions,
    });

    await exam.save();
    return exam;
  }

  async updateStatus(
    user: AuthUser,
    examId: string,
    dto: UpdateExamStatusDto,
  ): Promise<ExamDocument> {
    this.assertSuperAdmin(user);

    const exam = await this.findExam(examId);
    if (exam.status === dto.status) {
      return exam;
    }

    const allowed = ALLOWED_STATUS_TRANSITIONS[exam.status] ?? [];
    if (!allowed.includes(dto.status)) {
      throw new BadRequestException(
        `Cannot transition exam status from ${exam.status} to ${dto.status}`,
      );
    }

    if (dto.status === ExamStatus.PUBLISHED) {
      await this.publishExam(exam);
    }

    exam.status = dto.status;
    await exam.save();
    return exam;
  }

  async listVersions(
    user: AuthUser,
    examId: string,
  ): Promise<ExamVersionDocument[]> {
    this.assertSuperAdmin(user);
    await this.findExam(examId);

    return this.examVersionModel.find({ examId }).sort({ version: -1 }).exec();
  }

  async getVersion(
    user: AuthUser,
    examId: string,
    versionId: string,
  ): Promise<ExamVersionDocument> {
    this.assertSuperAdmin(user);
    await this.findExam(examId);
    this.assertObjectId(versionId, 'Exam version');

    const version = await this.examVersionModel.findById(versionId).exec();
    if (!version || version.examId.toString() !== examId) {
      throw new NotFoundException('Exam version not found');
    }
    return version;
  }

  private async publishExam(exam: ExamDocument): Promise<ExamVersionDocument> {
    const questionDocs = await this.loadApprovedQuestions(exam.questions);
    const questionMap = new Map(
      questionDocs.map((question) => [question.id, question]),
    );

    const publishQuestions = exam.questions.map((item) => {
      const question = questionMap.get(item.questionId.toString());
      if (!question) {
        throw new BadRequestException('Exam contains an unknown question');
      }
      return {
        questionId: item.questionId,
        cognitiveDomain: question.cognitiveDomain,
        marks: item.marks,
        order: item.order,
      };
    });

    if (publishQuestions.some((question) => question.marks !== REQUIRED_MARKS_PER_QUESTION)) {
      throw new BadRequestException(
        'Each official exam question must be worth 2 marks',
      );
    }

    const result = validateOfficialExamForPublish({
      totalMarks: exam.totalMarks,
      totalQuestions: exam.totalQuestions,
      sections: exam.sections,
      questions: publishQuestions,
    });
    if (!result.isValid) {
      throw new BadRequestException(result.errors.join('; '));
    }

    const versionQuestions = [];
    for (const item of exam.questions) {
      const question = questionMap.get(item.questionId.toString())!;
      const questionVersion = await this.getLatestQuestionVersion(question.id);
      versionQuestions.push({
        questionId: question._id,
        questionVersionId: questionVersion._id,
        cognitiveDomain: question.cognitiveDomain,
        marks: item.marks,
        order: item.order,
      });
    }

    const latest = await this.examVersionModel
      .findOne({ examId: exam._id })
      .sort({ version: -1 })
      .exec();
    const nextVersion = (latest?.version ?? 0) + 1;

    try {
      return await this.examVersionModel.create({
        examId: exam._id,
        version: nextVersion,
        title: exam.title,
        description: exam.description,
        durationMinutes: exam.durationMinutes,
        totalMarks: exam.totalMarks,
        totalQuestions: exam.totalQuestions,
        sections: exam.sections,
        questions: versionQuestions,
        publishedAt: new Date(),
      });
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code?: number }).code === 11000
      ) {
        throw new ConflictException(
          'An exam version for this publish already exists',
        );
      }
      throw error;
    }
  }

  private async loadApprovedQuestions(
    questions: Array<{ questionId: Types.ObjectId | string }>,
  ): Promise<QuestionDocument[]> {
    if (questions.length === 0) {
      return [];
    }

    const ids = questions.map((question) => question.questionId.toString());
    for (const id of ids) {
      this.assertObjectId(id, 'Question');
    }

    const docs = await this.questionModel.find({ _id: { $in: ids } }).exec();
    const found = new Set(docs.map((doc) => doc.id));
    const missing = ids.filter((id) => !found.has(id));
    if (missing.length > 0) {
      throw new BadRequestException('One or more questions were not found');
    }

    const unapproved = docs.filter(
      (doc) => doc.status !== QuestionStatus.APPROVED,
    );
    if (unapproved.length > 0) {
      throw new BadRequestException(
        'Exams may only include APPROVED questions',
      );
    }

    return docs;
  }

  private async getLatestQuestionVersion(
    questionId: string,
  ): Promise<QuestionVersionDocument> {
    const version = await this.questionVersionModel
      .findOne({ questionId })
      .sort({ version: -1 })
      .exec();
    if (!version) {
      throw new BadRequestException(
        'Approved questions must have an immutable QuestionVersion before exam publish',
      );
    }
    return version;
  }

  private assertDraftStructure(input: {
    sections: ExamSection[];
    questions: ExamQuestion[];
    questionDocs: QuestionDocument[];
    totalMarks: number;
    totalQuestions: number;
  }): void {
    const questionIds = input.questions.map((question) =>
      question.questionId.toString(),
    );
    if (new Set(questionIds).size !== questionIds.length) {
      throw new BadRequestException('Exam questions must not contain duplicates');
    }

    const orders = input.questions.map((question) => question.order);
    if (new Set(orders).size !== orders.length) {
      throw new BadRequestException('Exam question order values must be unique');
    }

    if (input.questions.length > 0 && input.totalQuestions !== input.questions.length) {
      throw new BadRequestException(
        'totalQuestions must match the number of assigned questions',
      );
    }

    const assignedMarks = input.questions.reduce(
      (sum, question) => sum + question.marks,
      0,
    );
    if (input.questions.length > 0 && input.totalMarks !== assignedMarks) {
      throw new BadRequestException(
        'totalMarks must match the sum of assigned question marks',
      );
    }

    const sectionDomains = input.sections.map((section) => section.cognitiveDomain);
    if (new Set(sectionDomains).size !== sectionDomains.length) {
      throw new BadRequestException(
        'Exam sections must not contain duplicate cognitive domains',
      );
    }

    if (input.sections.length === 0 || input.questions.length === 0) {
      return;
    }

    const questionMap = new Map(
      input.questionDocs.map((question) => [question.id, question]),
    );

    for (const section of input.sections) {
      const assigned = input.questions.filter((item) => {
        const question = questionMap.get(item.questionId.toString());
        return question?.cognitiveDomain === section.cognitiveDomain;
      });
      const marks = assigned.reduce((sum, item) => sum + item.marks, 0);
      if (assigned.length !== section.questionCount || marks !== section.marks) {
        throw new BadRequestException(
          `${section.cognitiveDomain} section totals must match its question assignments`,
        );
      }
    }

    for (const item of input.questions) {
      const question = questionMap.get(item.questionId.toString());
      if (
        question &&
        !input.sections.some(
          (section) => section.cognitiveDomain === question.cognitiveDomain,
        )
      ) {
        throw new BadRequestException(
          `Question ${item.questionId.toString()} has no matching section for ${question.cognitiveDomain}`,
        );
      }
    }
  }

  private normalizeSections(sections: ExamSectionDto[]): ExamSection[] {
    return sections.map((section) => ({
      cognitiveDomain: section.cognitiveDomain,
      title: section.title.trim(),
      instructions: section.instructions?.trim(),
      marks: section.marks,
      questionCount: section.questionCount,
    }));
  }

  private normalizeQuestions(questions: ExamQuestionDto[]): ExamQuestion[] {
    return questions.map((question) => ({
      questionId: new Types.ObjectId(question.questionId),
      marks: question.marks,
      order: question.order,
    }));
  }

  private assertValidWindow(startsAt: Date, endsAt: Date): void {
    if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime())) {
      throw new BadRequestException('Invalid exam date values');
    }
    if (endsAt <= startsAt) {
      throw new BadRequestException('endsAt must be after startsAt');
    }
  }

  private async findExam(examId: string): Promise<ExamDocument> {
    this.assertObjectId(examId, 'Exam');
    const exam = await this.examModel.findById(examId).exec();
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    return exam;
  }

  private assertSuperAdmin(user: AuthUser): void {
    if (!user.roles.includes(UserRole.SUPER_ADMIN)) {
      throw new ForbiddenException('Only super admins can manage exams');
    }
  }

  private assertObjectId(id: string, label: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`${label} not found`);
    }
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
