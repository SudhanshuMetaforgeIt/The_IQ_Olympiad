import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Types, type ClientSession, type Connection } from 'mongoose';

import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import {
  buildPaginatedResult,
  type PaginatedResult,
} from '../common/dto/pagination-query.dto.js';
import type { CognitiveDomain } from '../common/enums/cognitive-domain.enum.js';
import { MockTestAttemptStatus } from '../common/enums/mock-test-attempt-status.enum.js';
import { MockTestStatus } from '../common/enums/mock-test-status.enum.js';
import { QuestionType } from '../common/enums/question-type.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { EntitlementsService } from '../entitlements/entitlements.service.js';
import {
  MockTestVersion,
  type MockTestVersionDocument,
  type MockTestVersionQuestion,
} from '../mock-tests/schemas/mock-test-version.schema.js';
import {
  MockTest,
  type MockTestDocument,
} from '../mock-tests/schemas/mock-test.schema.js';
import {
  QuestionVersion,
  type QuestionVersionDocument,
} from '../questions/schemas/question-version.schema.js';
import { StudentsService } from '../students/students.service.js';
import type {
  ListMyMockTestAttemptsQueryDto,
  MockTestAttemptAnswerDto,
  SaveMockTestAnswersDto,
} from './dto/mock-test-attempts.dto.js';
import {
  MockTestAttempt,
  type MockTestAttemptAnswer,
  type MockTestAttemptDocument,
  type MockTestAttemptSectionScore,
} from './schemas/mock-test-attempt.schema.js';

type AttemptFilter = Record<string, unknown>;

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

export type StudentMockTestAttemptView = {
  id: string;
  mockTestId: string;
  mockTestVersionId: string;
  status: MockTestAttemptStatus;
  durationMinutes: number;
  totalScore?: number;
  totalMarks: number;
  sectionScores?: MockTestAttemptSectionScore[];
  answers: StudentAnswerView[];
  questions?: StudentQuestionView[];
  startedAt?: Date;
  submittedAt?: Date;
  evaluatedAt?: Date;
};

@Injectable()
export class MockTestAttemptsService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectModel(MockTestAttempt.name)
    private readonly attemptModel: Model<MockTestAttemptDocument>,
    @InjectModel(MockTest.name)
    private readonly mockTestModel: Model<MockTestDocument>,
    @InjectModel(MockTestVersion.name)
    private readonly mockTestVersionModel: Model<MockTestVersionDocument>,
    @InjectModel(QuestionVersion.name)
    private readonly questionVersionModel: Model<QuestionVersionDocument>,
    private readonly studentsService: StudentsService,
    private readonly entitlementsService: EntitlementsService,
  ) {}

  async create(
    user: AuthUser,
    mockTestId: string,
  ): Promise<StudentMockTestAttemptView> {
    this.assertStudent(user);
    this.assertObjectId(mockTestId, 'Mock test');

    const student = await this.studentsService.findByUserId(user.userId);
    const mockTest = await this.mockTestModel.findById(mockTestId).exec();
    if (!mockTest) {
      throw new NotFoundException('Mock test not found');
    }
    if (mockTest.status !== MockTestStatus.PUBLISHED) {
      throw new BadRequestException('Mock test is not published');
    }

    const version = await this.mockTestVersionModel
      .findOne({ mockTestId: mockTest._id })
      .sort({ version: -1 })
      .exec();
    if (!version) {
      throw new BadRequestException(
        'Published mock test has no frozen MockTestVersion',
      );
    }

    const attempt = await this.runInTransaction(async (session) => {
      const created = await this.attemptModel.create(
        [
          {
            studentId: student._id,
            mockTestId: mockTest._id,
            mockTestVersionId: version._id,
            status: MockTestAttemptStatus.NOT_STARTED,
            answers: [],
            sectionScores: [],
            totalScore: 0,
            totalMarks: version.totalMarks,
          },
        ],
        session ? { session } : {},
      );
      const document = Array.isArray(created) ? created[0] : created;

      await this.entitlementsService.consumeMockTestAttempt({
        studentId: student._id,
        mockTestAttemptId: document._id,
        session,
      });

      return document;
    });

    return this.toStudentView(attempt, version);
  }

  async listMine(
    user: AuthUser,
    query: ListMyMockTestAttemptsQueryDto,
  ): Promise<PaginatedResult<StudentMockTestAttemptView>> {
    this.assertStudent(user);
    const student = await this.studentsService.findByUserId(user.userId);

    const filter: AttemptFilter = { studentId: student._id };
    if (query.status) {
      filter.status = query.status;
    }
    if (query.mockTestId) {
      this.assertObjectId(query.mockTestId, 'Mock test');
      filter.mockTestId = query.mockTestId;
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
        const version = await this.findVersion(attempt.mockTestVersionId);
        return this.toStudentView(attempt, version);
      }),
    );

    return buildPaginatedResult(views, total, page, limit);
  }

  async getById(
    user: AuthUser,
    attemptId: string,
  ): Promise<StudentMockTestAttemptView> {
    const attempt = await this.requireOwnedAttempt(user, attemptId);
    const version = await this.findVersion(attempt.mockTestVersionId);
    const current = await this.expireIfNeeded(attempt, version.durationMinutes);
    const questionVersions = await this.loadQuestionVersions(version);
    return this.toStudentView(current, version, questionVersions, true);
  }

  async start(
    user: AuthUser,
    attemptId: string,
  ): Promise<StudentMockTestAttemptView> {
    const attempt = await this.requireOwnedAttempt(user, attemptId);
    const version = await this.findVersion(attempt.mockTestVersionId);

    if (attempt.status !== MockTestAttemptStatus.NOT_STARTED) {
      throw new BadRequestException(
        `Cannot start a mock test attempt in ${attempt.status} status`,
      );
    }

    const updated = await this.attemptModel
      .findOneAndUpdate(
        {
          _id: attempt._id,
          studentId: attempt.studentId,
          status: MockTestAttemptStatus.NOT_STARTED,
        },
        {
          $set: {
            status: MockTestAttemptStatus.IN_PROGRESS,
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
    dto: SaveMockTestAnswersDto,
  ): Promise<StudentMockTestAttemptView> {
    const attempt = await this.requireOwnedAttempt(user, attemptId);
    const version = await this.findVersion(attempt.mockTestVersionId);
    const current = await this.expireIfNeeded(attempt, version.durationMinutes);

    if (current.status === MockTestAttemptStatus.EXPIRED) {
      throw new BadRequestException('This mock test attempt has expired');
    }
    if (current.status !== MockTestAttemptStatus.IN_PROGRESS) {
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
          status: MockTestAttemptStatus.IN_PROGRESS,
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
  ): Promise<StudentMockTestAttemptView> {
    const attempt = await this.requireOwnedAttempt(user, attemptId);
    const version = await this.findVersion(attempt.mockTestVersionId);
    const current = await this.expireIfNeeded(attempt, version.durationMinutes);

    if (current.status === MockTestAttemptStatus.EXPIRED) {
      throw new BadRequestException('This mock test attempt has expired');
    }
    if (current.status !== MockTestAttemptStatus.IN_PROGRESS) {
      throw new BadRequestException(
        `Cannot submit a mock test attempt in ${current.status} status`,
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
      ? MockTestAttemptStatus.SUBMITTED
      : MockTestAttemptStatus.EVALUATED;

    const updated = await this.attemptModel
      .findOneAndUpdate(
        {
          _id: current._id,
          studentId: current.studentId,
          status: MockTestAttemptStatus.IN_PROGRESS,
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
              nextStatus === MockTestAttemptStatus.EVALUATED
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

  private mergeAnswers(
    existing: MockTestAttemptAnswer[],
    incoming: MockTestAttemptAnswerDto[],
    version: MockTestVersionDocument,
    questionVersions: QuestionVersionDocument[],
  ): MockTestAttemptAnswer[] {
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
    dto: MockTestAttemptAnswerDto,
    version: MockTestVersionDocument,
    questionVersions: QuestionVersionDocument[],
  ): MockTestAttemptAnswer {
    const assignment = version.questions.find(
      (question) => question.questionId.toString() === dto.questionId,
    );
    if (!assignment) {
      throw new BadRequestException('Question does not belong to this mock test');
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
    answers: MockTestAttemptAnswer[],
    version: MockTestVersionDocument,
    questionVersions: QuestionVersionDocument[],
  ): {
    answers: MockTestAttemptAnswer[];
    sectionScores: MockTestAttemptSectionScore[];
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
    const scoredAnswers: MockTestAttemptAnswer[] = [];
    const scoreByDomain = new Map<CognitiveDomain, { score: number; maxScore: number }>();

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
    existing: MockTestAttemptAnswer | undefined,
    assignment: MockTestVersionQuestion,
    questionVersion: QuestionVersionDocument,
  ): MockTestAttemptAnswer {
    const base: MockTestAttemptAnswer = {
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
    answers: MockTestAttemptAnswer[],
    version: MockTestVersionDocument,
    questionVersions: QuestionVersionDocument[],
  ): void {
    const assignedIds = new Set(
      version.questions.map((question) => question.questionId.toString()),
    );
    for (const answer of answers) {
      if (!assignedIds.has(answer.questionId.toString())) {
        throw new BadRequestException(
          'Attempt contains an answer for a question outside this mock test version',
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
    attempt: MockTestAttemptDocument,
    durationMinutes: number,
  ): Promise<MockTestAttemptDocument> {
    if (
      attempt.status !== MockTestAttemptStatus.IN_PROGRESS ||
      !attempt.startedAt ||
      !this.isPastDeadline(attempt.startedAt, durationMinutes)
    ) {
      return attempt;
    }

    const expired = await this.attemptModel
      .findOneAndUpdate(
        {
          _id: attempt._id,
          status: MockTestAttemptStatus.IN_PROGRESS,
        },
        { $set: { status: MockTestAttemptStatus.EXPIRED } },
        { new: true },
      )
      .exec();

    return expired ?? attempt;
  }

  private isPastDeadline(startedAt: Date, durationMinutes: number): boolean {
    return Date.now() > startedAt.getTime() + durationMinutes * 60_000;
  }

  private async loadQuestionVersions(
    version: MockTestVersionDocument,
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

  private async findVersion(
    versionId: Types.ObjectId | string,
  ): Promise<MockTestVersionDocument> {
    const version = await this.mockTestVersionModel.findById(versionId).exec();
    if (!version) {
      throw new NotFoundException('Mock test version not found');
    }
    return version;
  }

  private async requireOwnedAttempt(
    user: AuthUser,
    attemptId: string,
  ): Promise<MockTestAttemptDocument> {
    this.assertStudent(user);
    this.assertObjectId(attemptId, 'Mock test attempt');

    const student = await this.studentsService.findByUserId(user.userId);
    const attempt = await this.attemptModel.findById(attemptId).exec();
    if (!attempt) {
      throw new NotFoundException('Mock test attempt not found');
    }
    if (attempt.studentId.toString() !== student._id.toString()) {
      throw new ForbiddenException('You can only access your own attempts');
    }
    return attempt;
  }

  private toStudentView(
    attempt: MockTestAttemptDocument,
    version: MockTestVersionDocument,
    questionVersions: QuestionVersionDocument[] = [],
    includePaper = false,
  ): StudentMockTestAttemptView {
    const revealScoring =
      attempt.status === MockTestAttemptStatus.SUBMITTED ||
      attempt.status === MockTestAttemptStatus.EVALUATED;

    const view: StudentMockTestAttemptView = {
      id: attempt.id ?? attempt._id.toString(),
      mockTestId: attempt.mockTestId.toString(),
      mockTestVersionId: attempt.mockTestVersionId.toString(),
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

  private async runInTransaction<T>(
    work: (session: ClientSession | undefined) => Promise<T>,
  ): Promise<T> {
    const session = await this.connection.startSession();
    try {
      let result!: T;
      await session.withTransaction(async () => {
        result = await work(session);
      });
      return result;
    } catch (error) {
      if (!this.isTransactionUnsupported(error)) {
        throw error;
      }
    } finally {
      await session.endSession();
    }

    return work(undefined);
  }

  private isTransactionUnsupported(error: unknown): boolean {
    if (typeof error !== 'object' || error === null) {
      return false;
    }
    const candidate = error as {
      code?: number;
      codeName?: string;
      message?: string;
    };
    return (
      candidate.code === 20 ||
      candidate.codeName === 'IllegalOperation' ||
      Boolean(candidate.message?.includes('replica set member or mongos'))
    );
  }

  private assertStudent(user: AuthUser): void {
    if (!user.roles.includes(UserRole.STUDENT)) {
      throw new ForbiddenException('Only students can take mock tests');
    }
  }

  private assertObjectId(id: string, label: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`${label} not found`);
    }
  }
}
