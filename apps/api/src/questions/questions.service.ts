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
import { QuestionStatus } from '../common/enums/question-status.enum.js';
import { QuestionType } from '../common/enums/question-type.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import type {
  CreateQuestionDto,
  ListQuestionsQueryDto,
  QuestionGenerationDto,
  QuestionOptionDto,
  UpdateQuestionDto,
  UpdateQuestionStatusDto,
} from './dto/questions.dto.js';
import {
  QuestionVersion,
  type QuestionVersionDocument,
} from './schemas/question-version.schema.js';
import {
  Question,
  type QuestionDocument,
  type QuestionGeneration,
  type QuestionOption,
} from './schemas/question.schema.js';
import { validateQuestionAnswers } from './validators/question-content.validator.js';

type QuestionFilter = Record<string, unknown>;

const ALLOWED_STATUS_TRANSITIONS: Record<QuestionStatus, QuestionStatus[]> = {
  [QuestionStatus.DRAFT]: [QuestionStatus.APPROVED, QuestionStatus.REJECTED],
  [QuestionStatus.APPROVED]: [QuestionStatus.ARCHIVED],
  [QuestionStatus.REJECTED]: [QuestionStatus.DRAFT],
  [QuestionStatus.ARCHIVED]: [],
};

const EDITABLE_STATUSES: QuestionStatus[] = [
  QuestionStatus.DRAFT,
  QuestionStatus.REJECTED,
];

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(QuestionVersion.name)
    private readonly questionVersionModel: Model<QuestionVersionDocument>,
  ) {}

  async create(
    user: AuthUser,
    dto: CreateQuestionDto,
  ): Promise<QuestionDocument> {
    this.assertSuperAdmin(user);
    this.assertValidContent(dto);

    return this.questionModel.create({
      questionText: dto.questionText.trim(),
      questionType: dto.questionType,
      options: this.normalizeOptions(dto.options),
      correctOptionIds: dto.correctOptionIds ?? [],
      expectedAnswer: dto.expectedAnswer?.trim(),
      evaluationCriteria: dto.evaluationCriteria?.trim(),
      cognitiveDomain: dto.cognitiveDomain,
      difficulty: dto.difficulty,
      marks: dto.marks,
      explanation: dto.explanation?.trim(),
      generation: this.normalizeGeneration(dto.generation),
      status: QuestionStatus.DRAFT,
      usageCount: 0,
    });
  }

  async list(
    user: AuthUser,
    query: ListQuestionsQueryDto,
  ): Promise<PaginatedResult<QuestionDocument>> {
    this.assertSuperAdmin(user);

    const filter: QuestionFilter = {};
    if (query.status) {
      filter.status = query.status;
    }
    if (query.cognitiveDomain) {
      filter.cognitiveDomain = query.cognitiveDomain;
    }
    if (query.difficulty) {
      filter.difficulty = query.difficulty;
    }
    if (query.questionType) {
      filter.questionType = query.questionType;
    }
    if (query.source) {
      filter['generation.source'] = query.source;
    }
    if (query.search?.trim()) {
      const pattern = new RegExp(this.escapeRegex(query.search.trim()), 'i');
      filter.$or = [{ questionText: pattern }, { explanation: pattern }];
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const [items, total] = await Promise.all([
      this.questionModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.questionModel.countDocuments(filter).exec(),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async getById(user: AuthUser, questionId: string): Promise<QuestionDocument> {
    this.assertSuperAdmin(user);
    return this.findQuestion(questionId);
  }

  async update(
    user: AuthUser,
    questionId: string,
    dto: UpdateQuestionDto,
  ): Promise<QuestionDocument> {
    this.assertSuperAdmin(user);

    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    const question = await this.findQuestion(questionId);
    if (question.status === QuestionStatus.ARCHIVED) {
      throw new BadRequestException('Archived questions cannot be edited');
    }
    if (question.status === QuestionStatus.APPROVED) {
      throw new BadRequestException(
        'Approved questions cannot be edited; archive or create a new draft via a future workflow',
      );
    }
    if (!EDITABLE_STATUSES.includes(question.status)) {
      throw new BadRequestException(
        `Questions in ${question.status} status cannot be edited`,
      );
    }

    if (dto.questionText !== undefined) {
      question.questionText = dto.questionText.trim();
    }
    if (dto.questionType !== undefined) {
      question.questionType = dto.questionType;
    }
    if (dto.options !== undefined) {
      question.options = this.normalizeOptions(dto.options);
    }
    if (dto.correctOptionIds !== undefined) {
      question.correctOptionIds = dto.correctOptionIds;
    }
    if (dto.expectedAnswer !== undefined) {
      question.expectedAnswer = dto.expectedAnswer.trim();
    }
    if (dto.evaluationCriteria !== undefined) {
      question.evaluationCriteria = dto.evaluationCriteria.trim();
    }
    if (dto.cognitiveDomain !== undefined) {
      question.cognitiveDomain = dto.cognitiveDomain;
    }
    if (dto.difficulty !== undefined) {
      question.difficulty = dto.difficulty;
    }
    if (dto.marks !== undefined) {
      question.marks = dto.marks;
    }
    if (dto.explanation !== undefined) {
      question.explanation = dto.explanation.trim();
    }
    if (dto.generation !== undefined) {
      question.generation = this.normalizeGeneration(dto.generation);
    }

    this.assertValidContent({
      questionType: question.questionType,
      options: question.options,
      correctOptionIds: question.correctOptionIds,
      expectedAnswer: question.expectedAnswer,
      evaluationCriteria: question.evaluationCriteria,
    });

    await question.save();
    return question;
  }

  async updateStatus(
    user: AuthUser,
    questionId: string,
    dto: UpdateQuestionStatusDto,
  ): Promise<QuestionDocument> {
    this.assertSuperAdmin(user);

    const question = await this.findQuestion(questionId);
    if (question.status === dto.status) {
      return question;
    }

    const allowed = ALLOWED_STATUS_TRANSITIONS[question.status] ?? [];
    if (!allowed.includes(dto.status)) {
      throw new BadRequestException(
        `Cannot transition question status from ${question.status} to ${dto.status}`,
      );
    }

    if (dto.status === QuestionStatus.APPROVED) {
      this.assertValidContent({
        questionType: question.questionType,
        options: question.options,
        correctOptionIds: question.correctOptionIds,
        expectedAnswer: question.expectedAnswer,
        evaluationCriteria: question.evaluationCriteria,
      });
      await this.createImmutableVersion(question);
    }

    question.status = dto.status;
    await question.save();
    return question;
  }

  async listVersions(
    user: AuthUser,
    questionId: string,
  ): Promise<QuestionVersionDocument[]> {
    this.assertSuperAdmin(user);
    await this.findQuestion(questionId);

    return this.questionVersionModel
      .find({ questionId })
      .sort({ version: -1 })
      .exec();
  }

  async getVersion(
    user: AuthUser,
    questionId: string,
    versionId: string,
  ): Promise<QuestionVersionDocument> {
    this.assertSuperAdmin(user);
    await this.findQuestion(questionId);
    this.assertObjectId(versionId, 'Question version');

    const version = await this.questionVersionModel.findById(versionId).exec();
    if (!version || version.questionId.toString() !== questionId) {
      throw new NotFoundException('Question version not found');
    }
    return version;
  }

  private async createImmutableVersion(
    question: QuestionDocument,
  ): Promise<QuestionVersionDocument> {
    const latest = await this.questionVersionModel
      .findOne({ questionId: question._id })
      .sort({ version: -1 })
      .exec();
    const nextVersion = (latest?.version ?? 0) + 1;

    try {
      return await this.questionVersionModel.create({
        questionId: question._id,
        version: nextVersion,
        questionText: question.questionText,
        questionType: question.questionType,
        options: question.options,
        correctOptionIds: question.correctOptionIds,
        expectedAnswer: question.expectedAnswer,
        evaluationCriteria: question.evaluationCriteria,
        cognitiveDomain: question.cognitiveDomain,
        difficulty: question.difficulty,
        marks: question.marks,
        explanation: question.explanation,
        generation: question.generation,
      });
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code?: number }).code === 11000
      ) {
        throw new ConflictException(
          'A question version for this approval already exists',
        );
      }
      throw error;
    }
  }

  private assertValidContent(content: {
    questionType: QuestionType;
    options?: QuestionOptionDto[] | QuestionOption[];
    correctOptionIds?: string[];
    expectedAnswer?: string;
    evaluationCriteria?: string;
  }): void {
    const options = content.options ?? [];
    const correctOptionIds = content.correctOptionIds ?? [];

    if (
      content.questionType === QuestionType.MCQ ||
      content.questionType === QuestionType.MULTIPLE_SELECT
    ) {
      if (options.length < 2) {
        throw new BadRequestException(
          `${content.questionType} questions must include at least two options`,
        );
      }
    }

    if (content.questionType === QuestionType.OPEN_ENDED) {
      if (options.length > 0) {
        throw new BadRequestException(
          'OPEN_ENDED questions cannot include options',
        );
      }
      if (!content.expectedAnswer?.trim() || !content.evaluationCriteria?.trim()) {
        throw new BadRequestException(
          'OPEN_ENDED questions require expectedAnswer and evaluationCriteria',
        );
      }
    }

    const answerResult = validateQuestionAnswers({
      questionType: content.questionType,
      options,
      correctOptionIds,
    });
    if (answerResult !== true) {
      throw new BadRequestException(answerResult);
    }
  }

  private normalizeOptions(
    options: QuestionOptionDto[] | QuestionOption[] | undefined,
  ): QuestionOption[] {
    return (options ?? []).map((option) => ({
      id: option.id.trim(),
      text: option.text.trim(),
    }));
  }

  private normalizeGeneration(
    generation: QuestionGenerationDto,
  ): QuestionGeneration {
    return {
      source: generation.source,
      model: generation.model?.trim(),
      promptVersion: generation.promptVersion?.trim(),
      generatedAt: generation.generatedAt
        ? new Date(generation.generatedAt)
        : undefined,
    };
  }

  private async findQuestion(questionId: string): Promise<QuestionDocument> {
    this.assertObjectId(questionId, 'Question');
    const question = await this.questionModel.findById(questionId).exec();
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

  private assertSuperAdmin(user: AuthUser): void {
    if (!user.roles.includes(UserRole.SUPER_ADMIN)) {
      throw new ForbiddenException(
        'Only super admins can manage the question bank',
      );
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
