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
import type { CognitiveDomain } from '../common/enums/cognitive-domain.enum.js';
import { ExamAttemptStatus } from '../common/enums/exam-attempt-status.enum.js';
import { ExamStatus } from '../common/enums/exam-status.enum.js';
import { OlympiadRegistrationStatus } from '../common/enums/olympiad-registration-status.enum.js';
import { QuestionType } from '../common/enums/question-type.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import {
  ExamVersion,
  type ExamVersionDocument,
  type ExamVersionQuestion,
} from '../exams/schemas/exam-version.schema.js';
import { Exam, type ExamDocument } from '../exams/schemas/exam.schema.js';
import { OlympiadsService } from '../olympiads/olympiads.service.js';
import {
  QuestionVersion,
  type QuestionVersionDocument,
} from '../questions/schemas/question-version.schema.js';
import {
  OlympiadRegistration,
  type OlympiadRegistrationDocument,
} from '../registrations/schemas/olympiad-registration.schema.js';
import { StudentsService } from '../students/students.service.js';
import type {
  ExamAttemptAnswerDto,
  ListMyExamAttemptsQueryDto,
  SaveExamAnswersDto,
} from './dto/exam-attempts.dto.js';
import {
  ExamAttempt,
  type ExamAttemptAnswer,
  type ExamAttemptDocument,
  type ExamAttemptSectionScore,
} from './schemas/exam-attempt.schema.js';

type AttemptFilter = Record<string, unknown>;

const ATTEMPTABLE_EXAM_STATUSES: ExamStatus[] = [
  ExamStatus.PUBLISHED,
  ExamStatus.SCHEDULED,
  ExamStatus.ONGOING,
];

type StudentQuestionView = {
  questionId: string;
  questionVersionId: string;
  questionText: string;
  questionType: QuestionType;
  options: Array<{ id: string; text: string }>;
  cognitiveDomain: CognitiveDomain;
  marks: number;
  order: number;
};

type StudentAnswerView = {
  questionId: string;
  selectedOptionIds?: string[];
  responseText?: string;
  answeredAt?: Date;
  isCorrect?: boolean;
  marksAwarded?: number;
};

export type StudentExamAttemptView = {
  id: string;
  examId: string;
  examVersionId: string;
  registrationId: string;
  status: ExamAttemptStatus;
  durationMinutes: number;
  totalScore?: number;
  totalMarks: number;
  sectionScores?: ExamAttemptSectionScore[];
  answers: StudentAnswerView[];
  questions?: StudentQuestionView[];
  startedAt?: Date;
  submittedAt?: Date;
  evaluatedAt?: Date;
};

@Injectable()
export class ExamAttemptsService {
  constructor(
    @InjectModel(ExamAttempt.name)
    private readonly attemptModel: Model<ExamAttemptDocument>,
    @InjectModel(Exam.name)
    private readonly examModel: Model<ExamDocument>,
    @InjectModel(ExamVersion.name)
    private readonly examVersionModel: Model<ExamVersionDocument>,
    @InjectModel(OlympiadRegistration.name)
    private readonly registrationModel: Model<OlympiadRegistrationDocument>,
    @InjectModel(QuestionVersion.name)
    private readonly questionVersionModel: Model<QuestionVersionDocument>,
    private readonly studentsService: StudentsService,
    private readonly olympiadsService: OlympiadsService,
  ) {}

  async create(
    user: AuthUser,
    examId: string,
  ): Promise<StudentExamAttemptView> {
    this.assertStudent(user);
    this.assertObjectId(examId, 'Exam');

    const student = await this.studentsService.findByUserId(user.userId);
    const exam = await this.findExam(examId);
    const version = await this.findLatestVersion(exam._id);
    await this.olympiadsService.findById(exam.olympiadId.toString());
    const registration = await this.requireConfirmedRegistration(
      student._id,
      exam.olympiadId,
    );
    this.assertExamAttemptable(exam);

    const existing = await this.attemptModel
      .findOne({ studentId: student._id, examId: exam._id })
      .exec();
    if (existing) {
      throw new ConflictException(
        'You already have an official attempt for this exam',
      );
    }

    try {
      const created = await this.attemptModel.create({
        studentId: student._id,
        examId: exam._id,
        examVersionId: version._id,
        registrationId: registration._id,
        status: ExamAttemptStatus.NOT_STARTED,
        answers: [],
        sectionScores: [],
        totalScore: 0,
        totalMarks: version.totalMarks,
      });
      return this.toStudentView(created, version);
    } catch (error) {
      this.rethrowDuplicateConflict(error);
      throw error;
    }
  }

  async listMine(
    user: AuthUser,
    query: ListMyExamAttemptsQueryDto,
  ): Promise<PaginatedResult<StudentExamAttemptView>> {
    this.assertStudent(user);
    const student = await this.studentsService.findByUserId(user.userId);

    const filter: AttemptFilter = { studentId: student._id };
    if (query.status) {
      filter.status = query.status;
    }
    if (query.examId) {
      this.assertObjectId(query.examId, 'Exam');
      filter.examId = query.examId;
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const [items, total] = await Promise.all([
      this.attemptModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.attemptModel.countDocuments(filter).exec(),
    ]);

    const views = await Promise.all(
      items.map(async (attempt) => {
        const version = await this.findVersion(attempt.examVersionId);
        return this.toStudentView(attempt, version);
      }),
    );

    return buildPaginatedResult(views, total, page, limit);
  }

  async getById(
    user: AuthUser,
    attemptId: string,
  ): Promise<StudentExamAttemptView> {
    const attempt = await this.requireOwnedAttempt(user, attemptId);
    const exam = await this.findExam(attempt.examId.toString());
    const version = await this.findVersion(attempt.examVersionId);
    const current = await this.expireIfNeeded(attempt, version, exam);
    const questionVersions = await this.loadQuestionVersions(version);
    return this.toStudentView(current, version, questionVersions, true);
  }

  async start(
    user: AuthUser,
    attemptId: string,
  ): Promise<StudentExamAttemptView> {
    const attempt = await this.requireOwnedAttempt(user, attemptId);
    const exam = await this.findExam(attempt.examId.toString());
    const version = await this.findVersion(attempt.examVersionId);

    if (attempt.status === ExamAttemptStatus.EXPIRED) {
      throw new BadRequestException('Expired exam attempts cannot be restarted');
    }
    if (attempt.status !== ExamAttemptStatus.NOT_STARTED) {
      throw new BadRequestException(
        `Cannot start an exam attempt in ${attempt.status} status`,
      );
    }

    this.assertExamAttemptable(exam);

    const updated = await this.attemptModel
      .findOneAndUpdate(
        {
          _id: attempt._id,
          studentId: attempt.studentId,
          status: ExamAttemptStatus.NOT_STARTED,
        },
        {
          $set: {
            status: ExamAttemptStatus.IN_PROGRESS,
            startedAt: new Date(),
          },
        },
        { new: true },
      )
      .exec();

    if (!updated) {
      throw new BadRequestException('Attempt has already been started');
    }

    return this.toStudentView(updated, version);
  }

  async saveAnswers(
    user: AuthUser,
    attemptId: string,
    dto: SaveExamAnswersDto,
  ): Promise<StudentExamAttemptView> {
    const attempt = await this.requireOwnedAttempt(user, attemptId);
    const exam = await this.findExam(attempt.examId.toString());
    const version = await this.findVersion(attempt.examVersionId);
    const current = await this.expireIfNeeded(attempt, version, exam);

    if (current.status === ExamAttemptStatus.EXPIRED) {
      throw new BadRequestException('This exam attempt has expired');
    }
    if (current.status !== ExamAttemptStatus.IN_PROGRESS) {
      throw new BadRequestException(
        'Answers can only be saved while the attempt is in progress',
      );
    }

    const questionVersions = await this.loadQuestionVersions(version);
    const nextAnswers = this.mergeAnswers(
      current.answers,
      dto.answers,
      version,
      questionVersions,
    );

    const updated = await this.attemptModel
      .findOneAndUpdate(
        {
          _id: current._id,
          studentId: current.studentId,
          status: ExamAttemptStatus.IN_PROGRESS,
        },
        { $set: { answers: nextAnswers } },
        { new: true },
      )
      .exec();

    if (!updated) {
      throw new BadRequestException(
        'Answers can only be saved while the attempt is in progress',
      );
    }

    return this.toStudentView(updated, version);
  }

  async submit(
    user: AuthUser,
    attemptId: string,
  ): Promise<StudentExamAttemptView> {
    const attempt = await this.requireOwnedAttempt(user, attemptId);
    const exam = await this.findExam(attempt.examId.toString());
    const version = await this.findVersion(attempt.examVersionId);
    const current = await this.expireIfNeeded(attempt, version, exam);

    if (current.status === ExamAttemptStatus.EXPIRED) {
      throw new BadRequestException('This exam attempt has expired');
    }
    if (current.status !== ExamAttemptStatus.IN_PROGRESS) {
      throw new BadRequestException(
        `Cannot submit an exam attempt in ${current.status} status`,
      );
    }

    const questionVersions = await this.loadQuestionVersions(version);
    this.assertAnswersBelongToVersion(current.answers, version, questionVersions);

    const evaluation = this.evaluateAttempt(
      current.answers,
      version,
      questionVersions,
    );
    const submittedAt = new Date();
    const nextStatus = evaluation.hasPendingOpenEnded
      ? ExamAttemptStatus.SUBMITTED
      : ExamAttemptStatus.EVALUATED;

    const updated = await this.attemptModel
      .findOneAndUpdate(
        {
          _id: current._id,
          studentId: current.studentId,
          status: ExamAttemptStatus.IN_PROGRESS,
        },
        {
          $set: {
            answers: evaluation.answers,
            sectionScores: evaluation.sectionScores,
            totalScore: evaluation.totalScore,
            totalMarks: version.totalMarks,
            status: nextStatus,
            submittedAt,
            evaluatedAt:
              nextStatus === ExamAttemptStatus.EVALUATED
                ? submittedAt
                : undefined,
          },
        },
        { new: true },
      )
      .exec();

    if (!updated) {
      throw new BadRequestException('Attempt could not be submitted');
    }

    return this.toStudentView(updated, version, questionVersions);
  }

  private async requireConfirmedRegistration(
    studentId: Types.ObjectId | string,
    olympiadId: Types.ObjectId | string,
  ): Promise<OlympiadRegistrationDocument> {
    const registration = await this.registrationModel
      .findOne({
        studentId,
        olympiadId,
      })
      .exec();

    if (!registration) {
      throw new ForbiddenException(
        'You do not have a registration for this olympiad',
      );
    }
    if (registration.studentId.toString() !== studentId.toString()) {
      throw new ForbiddenException(
        'Registration does not belong to the authenticated student',
      );
    }
    if (registration.olympiadId.toString() !== olympiadId.toString()) {
      throw new ForbiddenException(
        'Registration does not belong to this exam olympiad',
      );
    }
    if (registration.status !== OlympiadRegistrationStatus.CONFIRMED) {
      throw new ForbiddenException(
        'Olympiad registration must be CONFIRMED to attempt this exam',
      );
    }

    return registration;
  }

  private assertExamAttemptable(exam: ExamDocument, now = new Date()): void {
    if (!ATTEMPTABLE_EXAM_STATUSES.includes(exam.status)) {
      throw new BadRequestException('Exam is not open for attempts');
    }
    if (now < exam.startsAt || now >= exam.endsAt) {
      throw new BadRequestException('Exam is outside its attempt window');
    }
  }

  private mergeAnswers(
    existing: ExamAttemptAnswer[],
    incoming: ExamAttemptAnswerDto[],
    version: ExamVersionDocument,
    questionVersions: QuestionVersionDocument[],
  ): ExamAttemptAnswer[] {
    const incomingIds = incoming.map((answer) => answer.questionId);
    if (new Set(incomingIds).size !== incomingIds.length) {
      throw new BadRequestException('Payload contains duplicate question answers');
    }

    const merged = new Map(
      existing.map((answer) => [answer.questionId.toString(), answer]),
    );

    for (const item of incoming) {
      const normalized = this.normalizeAnswer(item, version, questionVersions);
      merged.set(normalized.questionId.toString(), normalized);
    }

    return [...merged.values()];
  }

  private normalizeAnswer(
    dto: ExamAttemptAnswerDto,
    version: ExamVersionDocument,
    questionVersions: QuestionVersionDocument[],
  ): ExamAttemptAnswer {
    const assignment = version.questions.find(
      (question) => question.questionId.toString() === dto.questionId,
    );
    if (!assignment) {
      throw new BadRequestException('Question does not belong to this exam');
    }

    const questionVersion = questionVersions.find(
      (item) =>
        item._id.toString() === assignment.questionVersionId.toString() ||
        item.id === assignment.questionVersionId.toString(),
    );
    if (!questionVersion) {
      throw new BadRequestException('Frozen question version was not found');
    }

    const optionIds = new Set(questionVersion.options.map((option) => option.id));
    const selectedOptionIds = dto.selectedOptionIds ?? [];
    if (new Set(selectedOptionIds).size !== selectedOptionIds.length) {
      throw new BadRequestException('selectedOptionIds must not contain duplicates');
    }
    if (selectedOptionIds.some((id) => !optionIds.has(id))) {
      throw new BadRequestException('One or more selected option IDs are invalid');
    }

    if (questionVersion.questionType === QuestionType.MCQ) {
      if (dto.responseText?.trim()) {
        throw new BadRequestException('MCQ answers cannot include responseText');
      }
      if (selectedOptionIds.length !== 1) {
        throw new BadRequestException('MCQ answers must select exactly one option');
      }
      return {
        questionId: new Types.ObjectId(dto.questionId),
        selectedOptionIds,
        marksAwarded: 0,
        answeredAt: new Date(),
      };
    }

    if (questionVersion.questionType === QuestionType.MULTIPLE_SELECT) {
      if (dto.responseText?.trim()) {
        throw new BadRequestException(
          'MULTIPLE_SELECT answers cannot include responseText',
        );
      }
      if (selectedOptionIds.length < 1) {
        throw new BadRequestException(
          'MULTIPLE_SELECT answers must include at least one option',
        );
      }
      return {
        questionId: new Types.ObjectId(dto.questionId),
        selectedOptionIds,
        marksAwarded: 0,
        answeredAt: new Date(),
      };
    }

    if (!dto.responseText?.trim()) {
      throw new BadRequestException('OPEN_ENDED answers require responseText');
    }
    if (selectedOptionIds.length > 0) {
      throw new BadRequestException(
        'OPEN_ENDED answers cannot include selectedOptionIds',
      );
    }

    return {
      questionId: new Types.ObjectId(dto.questionId),
      responseText: dto.responseText.trim(),
      marksAwarded: 0,
      answeredAt: new Date(),
    };
  }

  private evaluateAttempt(
    answers: ExamAttemptAnswer[],
    version: ExamVersionDocument,
    questionVersions: QuestionVersionDocument[],
  ): {
    answers: ExamAttemptAnswer[];
    sectionScores: ExamAttemptSectionScore[];
    totalScore: number;
    hasPendingOpenEnded: boolean;
  } {
    const answerMap = new Map(
      answers.map((answer) => [answer.questionId.toString(), answer]),
    );
    const versionByQuestionId = new Map(
      questionVersions.map((item) => [item.questionId.toString(), item]),
    );

    let hasPendingOpenEnded = false;
    const scoredAnswers: ExamAttemptAnswer[] = [];
    const scoreByDomain = new Map<
      CognitiveDomain,
      { score: number; maxScore: number }
    >();

    for (const assignment of version.questions) {
      const questionVersion =
        versionByQuestionId.get(assignment.questionId.toString()) ??
        questionVersions.find(
          (item) =>
            item._id.toString() === assignment.questionVersionId.toString(),
        );
      if (!questionVersion) {
        throw new BadRequestException('Frozen question version was not found');
      }

      const domainScore = scoreByDomain.get(assignment.cognitiveDomain) ?? {
        score: 0,
        maxScore: 0,
      };
      domainScore.maxScore += assignment.marks;

      const existing = answerMap.get(assignment.questionId.toString());
      const scored = this.scoreAnswer(existing, assignment, questionVersion);
      if (questionVersion.questionType === QuestionType.OPEN_ENDED) {
        hasPendingOpenEnded = true;
      }
      domainScore.score += scored.marksAwarded;
      scoreByDomain.set(assignment.cognitiveDomain, domainScore);
      scoredAnswers.push(scored);
    }

    const sectionScores = version.sections.map((section) => {
      const scored = scoreByDomain.get(section.cognitiveDomain) ?? {
        score: 0,
        maxScore: section.marks,
      };
      return {
        cognitiveDomain: section.cognitiveDomain,
        score: scored.score,
        maxScore: section.marks,
      };
    });

    const totalScore = scoredAnswers.reduce(
      (sum, answer) => sum + answer.marksAwarded,
      0,
    );

    return {
      answers: scoredAnswers,
      sectionScores,
      totalScore,
      hasPendingOpenEnded,
    };
  }

  private scoreAnswer(
    existing: ExamAttemptAnswer | undefined,
    assignment: ExamVersionQuestion,
    questionVersion: QuestionVersionDocument,
  ): ExamAttemptAnswer {
    const base: ExamAttemptAnswer = {
      questionId: assignment.questionId,
      selectedOptionIds: existing?.selectedOptionIds,
      responseText: existing?.responseText,
      answeredAt: existing?.answeredAt,
      marksAwarded: 0,
    };

    if (questionVersion.questionType === QuestionType.OPEN_ENDED) {
      return base;
    }

    const selected = existing?.selectedOptionIds ?? [];
    const correct = questionVersion.correctOptionIds ?? [];
    const isCorrect =
      selected.length === correct.length &&
      selected.every((id) => correct.includes(id)) &&
      correct.every((id) => selected.includes(id));

    return {
      ...base,
      isCorrect,
      marksAwarded: isCorrect ? assignment.marks : 0,
    };
  }

  private assertAnswersBelongToVersion(
    answers: ExamAttemptAnswer[],
    version: ExamVersionDocument,
    questionVersions: QuestionVersionDocument[],
  ): void {
    const assignedIds = new Set(
      version.questions.map((question) => question.questionId.toString()),
    );
    for (const answer of answers) {
      if (!assignedIds.has(answer.questionId.toString())) {
        throw new BadRequestException(
          'Attempt contains an answer for a question outside this exam version',
        );
      }
    }

    const byQuestionId = new Map(
      questionVersions.map((item) => [item.questionId.toString(), item]),
    );
    for (const answer of answers) {
      const questionVersion = byQuestionId.get(answer.questionId.toString());
      if (!questionVersion) {
        continue;
      }
      const optionIds = new Set(questionVersion.options.map((option) => option.id));
      const selected = answer.selectedOptionIds ?? [];
      if (selected.some((id) => !optionIds.has(id))) {
        throw new BadRequestException('Attempt contains an invalid option selection');
      }
    }
  }

  private async expireIfNeeded(
    attempt: ExamAttemptDocument,
    version: ExamVersionDocument,
    exam: ExamDocument,
  ): Promise<ExamAttemptDocument> {
    if (attempt.status !== ExamAttemptStatus.IN_PROGRESS || !attempt.startedAt) {
      return attempt;
    }

    const deadline = this.resolveDeadline(
      attempt.startedAt,
      version.durationMinutes,
      exam.endsAt,
    );
    if (Date.now() < deadline.getTime()) {
      return attempt;
    }

    const expired = await this.attemptModel
      .findOneAndUpdate(
        {
          _id: attempt._id,
          status: ExamAttemptStatus.IN_PROGRESS,
        },
        { $set: { status: ExamAttemptStatus.EXPIRED } },
        { new: true },
      )
      .exec();

    return expired ?? attempt;
  }

  private resolveDeadline(
    startedAt: Date,
    durationMinutes: number,
    examEndsAt: Date,
  ): Date {
    const durationDeadline = new Date(
      startedAt.getTime() + durationMinutes * 60_000,
    );
    return durationDeadline.getTime() < examEndsAt.getTime()
      ? durationDeadline
      : examEndsAt;
  }

  private async loadQuestionVersions(
    version: ExamVersionDocument,
  ): Promise<QuestionVersionDocument[]> {
    const ids = version.questions.map((question) => question.questionVersionId);
    const docs = await this.questionVersionModel
      .find({ _id: { $in: ids } })
      .exec();
    if (docs.length !== ids.length) {
      throw new BadRequestException(
        'One or more frozen QuestionVersion documents are missing',
      );
    }
    return docs;
  }

  private async findExam(examId: string | Types.ObjectId): Promise<ExamDocument> {
    const id = examId.toString();
    this.assertObjectId(id, 'Exam');
    const exam = await this.examModel.findById(id).exec();
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    return exam;
  }

  private async findLatestVersion(
    examId: Types.ObjectId | string,
  ): Promise<ExamVersionDocument> {
    const version = await this.examVersionModel
      .findOne({ examId })
      .sort({ version: -1 })
      .exec();
    if (!version) {
      throw new BadRequestException('Exam has no frozen ExamVersion');
    }
    return version;
  }

  private async findVersion(
    versionId: Types.ObjectId | string,
  ): Promise<ExamVersionDocument> {
    const version = await this.examVersionModel.findById(versionId).exec();
    if (!version) {
      throw new NotFoundException('Exam version not found');
    }
    return version;
  }

  private async requireOwnedAttempt(
    user: AuthUser,
    attemptId: string,
  ): Promise<ExamAttemptDocument> {
    this.assertStudent(user);
    this.assertObjectId(attemptId, 'Exam attempt');

    const student = await this.studentsService.findByUserId(user.userId);
    const attempt = await this.attemptModel.findById(attemptId).exec();
    if (!attempt) {
      throw new NotFoundException('Exam attempt not found');
    }
    if (attempt.studentId.toString() !== student._id.toString()) {
      throw new ForbiddenException('You can only access your own attempts');
    }
    return attempt;
  }

  private toStudentView(
    attempt: ExamAttemptDocument,
    version: ExamVersionDocument,
    questionVersions: QuestionVersionDocument[] = [],
    includePaper = false,
  ): StudentExamAttemptView {
    const revealScoring =
      attempt.status === ExamAttemptStatus.SUBMITTED ||
      attempt.status === ExamAttemptStatus.EVALUATED;

    const view: StudentExamAttemptView = {
      id: attempt.id ?? attempt._id.toString(),
      examId: attempt.examId.toString(),
      examVersionId: attempt.examVersionId.toString(),
      registrationId: attempt.registrationId.toString(),
      status: attempt.status,
      durationMinutes: version.durationMinutes,
      totalMarks: attempt.totalMarks,
      answers: attempt.answers.map((answer) => ({
        questionId: answer.questionId.toString(),
        selectedOptionIds: answer.selectedOptionIds,
        responseText: answer.responseText,
        answeredAt: answer.answeredAt,
        ...(revealScoring
          ? {
              isCorrect: answer.isCorrect,
              marksAwarded: answer.marksAwarded,
            }
          : {}),
      })),
      startedAt: attempt.startedAt,
      submittedAt: attempt.submittedAt,
      evaluatedAt: attempt.evaluatedAt,
    };

    if (revealScoring) {
      view.totalScore = attempt.totalScore;
      view.sectionScores = attempt.sectionScores;
    }

    if (includePaper) {
      const versionsById = new Map(
        questionVersions.map((item) => [item.id ?? item._id.toString(), item]),
      );
      view.questions = version.questions.map((assignment) => {
        const questionVersion =
          versionsById.get(assignment.questionVersionId.toString()) ??
          questionVersions.find(
            (item) =>
              item.questionId.toString() === assignment.questionId.toString(),
          );
        if (!questionVersion) {
          throw new BadRequestException('Frozen question version was not found');
        }
        return {
          questionId: assignment.questionId.toString(),
          questionVersionId: assignment.questionVersionId.toString(),
          questionText: questionVersion.questionText,
          questionType: questionVersion.questionType,
          options: questionVersion.options.map((option) => ({
            id: option.id,
            text: option.text,
          })),
          cognitiveDomain: assignment.cognitiveDomain,
          marks: assignment.marks,
          order: assignment.order,
        };
      });
    }

    return view;
  }

  private rethrowDuplicateConflict(error: unknown): void {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: number }).code === 11000
    ) {
      throw new ConflictException(
        'You already have an official attempt for this exam',
      );
    }
  }

  private assertStudent(user: AuthUser): void {
    if (!user.roles.includes(UserRole.STUDENT)) {
      throw new ForbiddenException('Only students can take official exams');
    }
  }

  private assertObjectId(id: string, label: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`${label} not found`);
    }
  }
}
