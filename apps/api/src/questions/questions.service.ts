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
import { CognitiveDomain } from '../common/enums/cognitive-domain.enum.js';
import type {
  CreateQuestionDto,
  DemoExamQuestionsResponse,
  DemoExamResultResponse,
  ListApprovedQuestionsQueryDto,
  ListQuestionsQueryDto,
  QuestionGenerationDto,
  QuestionOptionDto,
  StudentQuestionResponse,
  SubmitDemoExamAnswersDto,
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
import { selectedOptionsMatchCorrect } from './utils/selected-options-match.js';
import { validateQuestionAnswers } from './validators/question-content.validator.js';

type QuestionFilter = Record<string, unknown>;

const DEMO_DOMAIN_ORDER: CognitiveDomain[] = [
  CognitiveDomain.THINK,
  CognitiveDomain.ANALYSE,
  CognitiveDomain.SOLVE,
  CognitiveDomain.DECIDE,
  CognitiveDomain.CREATE,
];

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

  /**
   * Student-facing approved question list.
   * Never returns answers, explanations, or generation metadata.
   */
  async listApproved(
    query: ListApprovedQuestionsQueryDto,
  ): Promise<StudentQuestionResponse[]> {
    const filter: QuestionFilter = {
      status: QuestionStatus.APPROVED,
    };

    if (query.cognitiveDomain) {
      filter.cognitiveDomain = query.cognitiveDomain;
    }
    if (query.difficulty) {
      filter.difficulty = query.difficulty;
    }

    const questions = await this.questionModel
      .find(filter)
      .select({
        questionText: 1,
        questionType: 1,
        cognitiveDomain: 1,
        difficulty: 1,
        options: 1,
        marks: 1,
        externalId: 1,
      })
      .lean()
      .exec();

    return this.sortDemoQuestions(questions).map((question) =>
      this.toStudentQuestion(question),
    );
  }

  /**
   * Full curated demo paper: all APPROVED seeded questions in exam order.
   */
  async getDemoExamQuestions(): Promise<DemoExamQuestionsResponse> {
    const questions = await this.listApproved({});

    if (questions.length === 0) {
      throw new NotFoundException(
        'No approved demo questions found. Run the question seed first.',
      );
    }

    const marksPerQuestion = questions[0]?.marks ?? 2;

    return {
      title: 'The IQ Olympiad',
      totalQuestions: questions.length,
      totalMarks: questions.reduce((sum, question) => sum + question.marks, 0),
      marksPerQuestion,
      questions,
    };
  }

  /**
   * Demo-only server-side scoring against live APPROVED questions.
   * Does not persist an ExamAttempt; returns a safe result payload only.
   */
  async submitDemoExam(
    dto: SubmitDemoExamAnswersDto,
  ): Promise<DemoExamResultResponse> {
    const answers = dto.answers ?? [];
    const submittedIds = answers.map((answer) => answer.questionId);

    if (new Set(submittedIds).size !== submittedIds.length) {
      throw new BadRequestException('Payload contains duplicate question IDs');
    }

    for (const questionId of submittedIds) {
      this.assertObjectId(questionId, 'Question');
    }

    for (const answer of answers) {
      const selected = answer.selectedOptionIds ?? [];
      if (new Set(selected).size !== selected.length) {
        throw new BadRequestException(
          'selectedOptionIds must not contain duplicates',
        );
      }
    }

    const paperQuestions = await this.questionModel
      .find({ status: QuestionStatus.APPROVED })
      .select({
        cognitiveDomain: 1,
        marks: 1,
        options: 1,
        correctOptionIds: 1,
        externalId: 1,
      })
      .lean()
      .exec();

    if (paperQuestions.length === 0) {
      throw new NotFoundException(
        'No approved demo questions found. Run the question seed first.',
      );
    }

    const sortedPaper = this.sortDemoQuestions(paperQuestions);
    const paperById = new Map(
      sortedPaper.map((question) => [question._id.toString(), question]),
    );

    for (const answer of answers) {
      const question = paperById.get(answer.questionId);
      if (!question) {
        throw new BadRequestException(
          `Question ${answer.questionId} is not part of the approved demo paper`,
        );
      }

      const optionIds = new Set(
        (question.options ?? []).map((option) => option.id),
      );
      const selected = answer.selectedOptionIds ?? [];
      if (selected.some((id) => !optionIds.has(id))) {
        throw new BadRequestException(
          `One or more selected option IDs are invalid for question ${answer.questionId}`,
        );
      }
    }

    const answerMap = new Map(
      answers.map((answer) => [answer.questionId, answer.selectedOptionIds ?? []]),
    );

    let totalScore = 0;
    let totalMarks = 0;
    let attempted = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    const sectionStats = new Map<
      CognitiveDomain,
      { score: number; maxScore: number; attempted: number; correct: number }
    >();

    for (const domain of DEMO_DOMAIN_ORDER) {
      sectionStats.set(domain, {
        score: 0,
        maxScore: 0,
        attempted: 0,
        correct: 0,
      });
    }

    for (const question of sortedPaper) {
      const questionId = question._id.toString();
      const marks = question.marks;
      const domain = question.cognitiveDomain;
      const section = sectionStats.get(domain) ?? {
        score: 0,
        maxScore: 0,
        attempted: 0,
        correct: 0,
      };

      totalMarks += marks;
      section.maxScore += marks;

      const selected = answerMap.get(questionId);
      const hasAttempt =
        selected !== undefined && selected.length > 0;

      if (!hasAttempt) {
        sectionStats.set(domain, section);
        continue;
      }

      attempted += 1;
      section.attempted += 1;

      const isCorrect = selectedOptionsMatchCorrect(
        selected,
        question.correctOptionIds ?? [],
      );

      if (isCorrect) {
        totalScore += marks;
        correctAnswers += 1;
        section.score += marks;
        section.correct += 1;
      } else {
        incorrectAnswers += 1;
      }

      sectionStats.set(domain, section);
    }

    return {
      totalScore,
      totalMarks,
      attempted,
      correctAnswers,
      incorrectAnswers,
      unattempted: sortedPaper.length - attempted,
      sectionScores: DEMO_DOMAIN_ORDER.map((domain) => {
        const section = sectionStats.get(domain)!;
        return {
          cognitiveDomain: domain,
          score: section.score,
          maxScore: section.maxScore,
          attempted: section.attempted,
          correct: section.correct,
        };
      }),
    };
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

  private toStudentQuestion(question: {
    _id: Types.ObjectId;
    questionText: string;
    questionType: Question['questionType'];
    cognitiveDomain: Question['cognitiveDomain'];
    difficulty: Question['difficulty'];
    options: QuestionOption[];
    marks: number;
  }): StudentQuestionResponse {
    return {
      id: question._id.toString(),
      questionText: question.questionText,
      questionType: question.questionType,
      cognitiveDomain: question.cognitiveDomain,
      difficulty: question.difficulty,
      options: (question.options ?? []).map((option) => ({
        id: option.id,
        text: option.text,
      })),
      marks: question.marks,
    };
  }

  private sortDemoQuestions<
    T extends {
      cognitiveDomain: CognitiveDomain;
      externalId?: string | null;
    },
  >(questions: T[]): T[] {
    return [...questions].sort((a, b) => {
      const domainDiff =
        DEMO_DOMAIN_ORDER.indexOf(a.cognitiveDomain) -
        DEMO_DOMAIN_ORDER.indexOf(b.cognitiveDomain);
      if (domainDiff !== 0) {
        return domainDiff;
      }

      return (
        this.extractExternalSequence(a.externalId) -
        this.extractExternalSequence(b.externalId)
      );
    });
  }

  private extractExternalSequence(externalId?: string | null): number {
    if (!externalId) {
      return Number.MAX_SAFE_INTEGER;
    }
    const match = externalId.match(/_(\d+)/);
    return match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
  }
}
