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
import { MockTestStatus } from '../common/enums/mock-test-status.enum.js';
import { QuestionStatus } from '../common/enums/question-status.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import {
  QuestionVersion,
  type QuestionVersionDocument,
} from '../questions/schemas/question-version.schema.js';
import {
  Question,
  type QuestionDocument,
} from '../questions/schemas/question.schema.js';
import type {
  CreateMockTestDto,
  ListMockTestsQueryDto,
  MockTestQuestionDto,
  MockTestSectionDto,
  UpdateMockTestDto,
  UpdateMockTestStatusDto,
} from './dto/mock-tests.dto.js';
import {
  MockTestVersion,
  type MockTestVersionDocument,
} from './schemas/mock-test-version.schema.js';
import {
  MockTest,
  type MockTestDocument,
  type MockTestQuestion,
  type MockTestSection,
} from './schemas/mock-test.schema.js';

type MockTestFilter = Record<string, unknown>;

const ALLOWED_STATUS_TRANSITIONS: Record<MockTestStatus, MockTestStatus[]> = {
  [MockTestStatus.DRAFT]: [MockTestStatus.PUBLISHED],
  [MockTestStatus.PUBLISHED]: [MockTestStatus.ARCHIVED],
  [MockTestStatus.ARCHIVED]: [],
};

@Injectable()
export class MockTestsService {
  constructor(
    @InjectModel(MockTest.name)
    private readonly mockTestModel: Model<MockTestDocument>,
    @InjectModel(MockTestVersion.name)
    private readonly mockTestVersionModel: Model<MockTestVersionDocument>,
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(QuestionVersion.name)
    private readonly questionVersionModel: Model<QuestionVersionDocument>,
  ) {}

  async create(
    user: AuthUser,
    dto: CreateMockTestDto,
  ): Promise<MockTestDocument> {
    this.assertSuperAdmin(user);

    const sections = this.normalizeSections(dto.sections);
    const questions = this.normalizeQuestions(dto.questions);
    this.assertUniqueQuestions(questions);

    const questionDocs = await this.loadApprovedQuestions(questions);
    await this.ensureQuestionVersions(questionDocs);
    this.assertStructure({
      sections,
      questions,
      questionDocs,
      totalMarks: dto.totalMarks,
      totalQuestions: dto.totalQuestions,
    });

    return this.mockTestModel.create({
      title: dto.title.trim(),
      description: dto.description?.trim(),
      durationMinutes: dto.durationMinutes,
      totalMarks: dto.totalMarks,
      totalQuestions: dto.totalQuestions,
      sections,
      questions,
      status: MockTestStatus.DRAFT,
    });
  }

  async list(
    user: AuthUser,
    query: ListMockTestsQueryDto,
  ): Promise<PaginatedResult<MockTestDocument>> {
    this.assertSuperAdmin(user);

    const filter: MockTestFilter = {};
    if (query.status) {
      filter.status = query.status;
    }
    if (query.cognitiveDomain) {
      filter['sections.cognitiveDomain'] = query.cognitiveDomain;
    }
    if (query.search?.trim()) {
      const pattern = new RegExp(this.escapeRegex(query.search.trim()), 'i');
      filter.$or = [{ title: pattern }, { description: pattern }];
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const [items, total] = await Promise.all([
      this.mockTestModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.mockTestModel.countDocuments(filter).exec(),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async getById(user: AuthUser, mockTestId: string): Promise<MockTestDocument> {
    this.assertSuperAdmin(user);
    return this.findMockTest(mockTestId);
  }

  async update(
    user: AuthUser,
    mockTestId: string,
    dto: UpdateMockTestDto,
  ): Promise<MockTestDocument> {
    this.assertSuperAdmin(user);

    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    const mockTest = await this.findMockTest(mockTestId);
    if (mockTest.status !== MockTestStatus.DRAFT) {
      throw new BadRequestException(
        `${mockTest.status} mock tests cannot be edited`,
      );
    }

    if (dto.title !== undefined) {
      mockTest.title = dto.title.trim();
    }
    if (dto.description !== undefined) {
      mockTest.description = dto.description.trim();
    }
    if (dto.durationMinutes !== undefined) {
      mockTest.durationMinutes = dto.durationMinutes;
    }
    if (dto.sections !== undefined) {
      mockTest.sections = this.normalizeSections(dto.sections);
    }
    if (dto.questions !== undefined) {
      mockTest.questions = this.normalizeQuestions(dto.questions);
    }

    if (dto.questions !== undefined) {
      mockTest.totalQuestions = mockTest.questions.length;
      mockTest.totalMarks = mockTest.questions.reduce(
        (sum, question) => sum + question.marks,
        0,
      );
    } else {
      if (dto.totalQuestions !== undefined) {
        mockTest.totalQuestions = dto.totalQuestions;
      }
      if (dto.totalMarks !== undefined) {
        mockTest.totalMarks = dto.totalMarks;
      }
    }

    this.assertUniqueQuestions(mockTest.questions);
    const questionDocs = await this.loadApprovedQuestions(mockTest.questions);
    await this.ensureQuestionVersions(questionDocs);
    this.assertStructure({
      sections: mockTest.sections,
      questions: mockTest.questions,
      questionDocs,
      totalMarks: mockTest.totalMarks,
      totalQuestions: mockTest.totalQuestions,
    });

    await mockTest.save();
    return mockTest;
  }

  async updateStatus(
    user: AuthUser,
    mockTestId: string,
    dto: UpdateMockTestStatusDto,
  ): Promise<MockTestDocument> {
    this.assertSuperAdmin(user);

    const mockTest = await this.findMockTest(mockTestId);
    if (mockTest.status === dto.status) {
      return mockTest;
    }

    const allowed = ALLOWED_STATUS_TRANSITIONS[mockTest.status] ?? [];
    if (!allowed.includes(dto.status)) {
      throw new BadRequestException(
        `Cannot transition mock test status from ${mockTest.status} to ${dto.status}`,
      );
    }

    if (dto.status === MockTestStatus.PUBLISHED) {
      await this.publishMockTest(mockTest);
    }

    mockTest.status = dto.status;
    await mockTest.save();
    return mockTest;
  }

  async listVersions(
    user: AuthUser,
    mockTestId: string,
  ): Promise<MockTestVersionDocument[]> {
    this.assertSuperAdmin(user);
    await this.findMockTest(mockTestId);

    return this.mockTestVersionModel
      .find({ mockTestId })
      .sort({ version: -1 })
      .exec();
  }

  async getVersion(
    user: AuthUser,
    mockTestId: string,
    versionId: string,
  ): Promise<MockTestVersionDocument> {
    this.assertSuperAdmin(user);
    await this.findMockTest(mockTestId);
    this.assertObjectId(versionId, 'Mock test version');

    const version = await this.mockTestVersionModel.findById(versionId).exec();
    if (!version || version.mockTestId.toString() !== mockTestId) {
      throw new NotFoundException('Mock test version not found');
    }
    return version;
  }

  private async publishMockTest(
    mockTest: MockTestDocument,
  ): Promise<MockTestVersionDocument> {
    this.assertUniqueQuestions(mockTest.questions);
    const questionDocs = await this.loadApprovedQuestions(mockTest.questions);
    const versionByQuestionId =
      await this.ensureQuestionVersions(questionDocs);
    this.assertStructure({
      sections: mockTest.sections,
      questions: mockTest.questions,
      questionDocs,
      totalMarks: mockTest.totalMarks,
      totalQuestions: mockTest.totalQuestions,
    });

    const questionMap = new Map(
      questionDocs.map((question) => [question.id, question]),
    );
    const versionQuestions = mockTest.questions.map((item) => {
      const question = questionMap.get(item.questionId.toString());
      const questionVersion = versionByQuestionId.get(
        item.questionId.toString(),
      );
      if (!question || !questionVersion) {
        throw new BadRequestException('Mock test contains an unknown question');
      }
      return {
        questionId: question._id,
        questionVersionId: questionVersion._id,
        cognitiveDomain: question.cognitiveDomain,
        marks: item.marks,
        order: item.order,
      };
    });

    const latest = await this.mockTestVersionModel
      .findOne({ mockTestId: mockTest._id })
      .sort({ version: -1 })
      .exec();
    const nextVersion = (latest?.version ?? 0) + 1;

    try {
      return await this.mockTestVersionModel.create({
        mockTestId: mockTest._id,
        version: nextVersion,
        title: mockTest.title,
        description: mockTest.description,
        durationMinutes: mockTest.durationMinutes,
        totalMarks: mockTest.totalMarks,
        totalQuestions: mockTest.totalQuestions,
        sections: mockTest.sections,
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
          'A mock test version for this publish already exists',
        );
      }
      throw error;
    }
  }

  private async loadApprovedQuestions(
    questions: Array<{ questionId: Types.ObjectId | string }>,
  ): Promise<QuestionDocument[]> {
    if (questions.length === 0) {
      throw new BadRequestException('Mock tests must contain at least one question');
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
        'Mock tests may only include APPROVED questions',
      );
    }

    return docs;
  }

  private async ensureQuestionVersions(
    questionDocs: QuestionDocument[],
  ): Promise<Map<string, QuestionVersionDocument>> {
    const versions = new Map<string, QuestionVersionDocument>();
    for (const question of questionDocs) {
      versions.set(question.id, await this.getLatestQuestionVersion(question.id));
    }
    return versions;
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
        'Approved questions must have an immutable QuestionVersion before they can be used in a mock test',
      );
    }
    return version;
  }

  private assertUniqueQuestions(questions: MockTestQuestion[]): void {
    const questionIds = questions.map((question) =>
      question.questionId.toString(),
    );
    if (new Set(questionIds).size !== questionIds.length) {
      throw new BadRequestException(
        'Mock test questions must not contain duplicates',
      );
    }

    const orders = questions.map((question) => question.order);
    if (new Set(orders).size !== orders.length) {
      throw new BadRequestException(
        'Mock test question order values must be unique',
      );
    }
  }

  private assertStructure(input: {
    sections: MockTestSection[];
    questions: MockTestQuestion[];
    questionDocs: QuestionDocument[];
    totalMarks: number;
    totalQuestions: number;
  }): void {
    if (input.sections.length === 0) {
      throw new BadRequestException('Mock tests must contain at least one section');
    }
    if (input.questions.length === 0) {
      throw new BadRequestException(
        'Mock tests must contain at least one question',
      );
    }

    const sectionDomains = input.sections.map(
      (section) => section.cognitiveDomain,
    );
    if (new Set(sectionDomains).size !== sectionDomains.length) {
      throw new BadRequestException(
        'Mock test sections must not contain duplicate cognitive domains',
      );
    }

    if (input.totalQuestions !== input.questions.length) {
      throw new BadRequestException(
        'totalQuestions must match the number of assigned questions',
      );
    }

    const assignedMarks = input.questions.reduce(
      (sum, question) => sum + question.marks,
      0,
    );
    if (input.totalMarks !== assignedMarks) {
      throw new BadRequestException(
        'totalMarks must match the sum of assigned question marks',
      );
    }

    const questionMap = new Map(
      input.questionDocs.map((question) => [question.id, question]),
    );

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

    for (const section of input.sections) {
      const assigned = input.questions.filter((item) => {
        const question = questionMap.get(item.questionId.toString());
        return question?.cognitiveDomain === section.cognitiveDomain;
      });

      if (assigned.length === 0) {
        throw new BadRequestException(
          `${section.cognitiveDomain} section must contain at least one question`,
        );
      }
      if (assigned.length !== section.questionCount) {
        throw new BadRequestException(
          `${section.cognitiveDomain} section questionCount must match its assigned questions`,
        );
      }

      const marks = assigned.reduce((sum, item) => sum + item.marks, 0);
      if (marks !== section.marks) {
        throw new BadRequestException(
          `${section.cognitiveDomain} section marks must match its assigned question marks`,
        );
      }
    }
  }

  private normalizeSections(sections: MockTestSectionDto[]): MockTestSection[] {
    return sections.map((section) => ({
      cognitiveDomain: section.cognitiveDomain,
      title: section.title.trim(),
      instructions: section.instructions?.trim(),
      marks: section.marks,
      questionCount: section.questionCount,
    }));
  }

  private normalizeQuestions(
    questions: MockTestQuestionDto[],
  ): MockTestQuestion[] {
    return questions.map((question) => ({
      questionId: new Types.ObjectId(question.questionId),
      marks: question.marks,
      order: question.order,
    }));
  }

  private async findMockTest(mockTestId: string): Promise<MockTestDocument> {
    this.assertObjectId(mockTestId, 'Mock test');
    const mockTest = await this.mockTestModel.findById(mockTestId).exec();
    if (!mockTest) {
      throw new NotFoundException('Mock test not found');
    }
    return mockTest;
  }

  private assertSuperAdmin(user: AuthUser): void {
    if (!user.roles.includes(UserRole.SUPER_ADMIN)) {
      throw new ForbiddenException('Only super admins can manage mock tests');
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
