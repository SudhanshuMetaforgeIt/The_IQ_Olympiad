import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { CognitiveDomain } from '../common/enums/cognitive-domain.enum.js';
import { MockTestStatus } from '../common/enums/mock-test-status.enum.js';
import { QuestionStatus } from '../common/enums/question-status.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import type { CreateMockTestDto } from './dto/mock-tests.dto.js';
import { MockTestsService } from './mock-tests.service.js';

const mockTestId = '64b64c4f2f1c2a3b4c5d6ee1';
const versionId = '64b64c4f2f1c2a3b4c5d6ee2';
const userId = '64b64c4f2f1c2a3b4c5d6ee3';
const questionA = '64b64c4f2f1c2a3b4c5d6ef1';
const questionB = '64b64c4f2f1c2a3b4c5d6ef2';
const questionVersionA = '64b64c4f2f1c2a3b4c5d6ef3';
const questionVersionB = '64b64c4f2f1c2a3b4c5d6ef4';

function validCreateDto(
  overrides: Partial<CreateMockTestDto> = {},
): CreateMockTestDto {
  return {
    title: 'Practice Think Set',
    description: 'Short practice paper',
    durationMinutes: 30,
    totalMarks: 5,
    totalQuestions: 2,
    sections: [
      {
        cognitiveDomain: CognitiveDomain.THINK,
        title: 'Think',
        marks: 5,
        questionCount: 2,
      },
    ],
    questions: [
      { questionId: questionA, marks: 2, order: 1 },
      { questionId: questionB, marks: 3, order: 2 },
    ],
    ...overrides,
  };
}

function approvedQuestionDocs() {
  return [
    {
      id: questionA,
      _id: questionA,
      status: QuestionStatus.APPROVED,
      cognitiveDomain: CognitiveDomain.THINK,
    },
    {
      id: questionB,
      _id: questionB,
      status: QuestionStatus.APPROVED,
      cognitiveDomain: CognitiveDomain.THINK,
    },
  ];
}

function createMockTestDoc(overrides: Record<string, unknown> = {}) {
  const dto = validCreateDto();
  return {
    id: mockTestId,
    _id: mockTestId,
    title: dto.title,
    description: dto.description,
    durationMinutes: dto.durationMinutes,
    totalMarks: dto.totalMarks,
    totalQuestions: dto.totalQuestions,
    sections: dto.sections,
    questions: dto.questions.map((question) => ({
      ...question,
      questionId: { toString: () => question.questionId },
    })),
    status: MockTestStatus.DRAFT,
    save: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

describe('MockTestsService', () => {
  const mockTestModel = {
    create: vi.fn(),
    findById: vi.fn(),
    find: vi.fn(),
    countDocuments: vi.fn(),
  };
  const mockTestVersionModel = {
    create: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    findById: vi.fn(),
  };
  const questionModel = {
    find: vi.fn(),
  };
  const questionVersionModel = {
    findOne: vi.fn(),
  };

  let service: MockTestsService;

  const superAdmin: AuthUser = {
    userId,
    email: 'admin@example.com',
    roles: [UserRole.SUPER_ADMIN],
  };
  const student: AuthUser = {
    userId,
    email: 'student@example.com',
    roles: [UserRole.STUDENT],
  };

  function mockApprovedQuestions(
    docs = approvedQuestionDocs(),
  ) {
    questionModel.find.mockReturnValue({
      exec: vi.fn().mockResolvedValue(docs),
    });
    questionVersionModel.findOne.mockImplementation((query: { questionId?: string }) => ({
      sort: vi.fn().mockReturnThis(),
      exec: vi.fn().mockResolvedValue(
        query.questionId === questionB
          ? { _id: questionVersionB, version: 1 }
          : { _id: questionVersionA, version: 1 },
      ),
    }));
  }

  beforeEach(() => {
    vi.clearAllMocks();
    service = new MockTestsService(
      mockTestModel as never,
      mockTestVersionModel as never,
      questionModel as never,
      questionVersionModel as never,
    );
  });

  describe('access', () => {
    it('rejects non-admin create', async () => {
      await expect(
        service.create(student, validCreateDto()),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('create', () => {
    it('creates a draft mock test', async () => {
      mockApprovedQuestions();
      const created = createMockTestDoc();
      mockTestModel.create.mockResolvedValue(created);

      const result = await service.create(superAdmin, validCreateDto());

      expect(result.status).toBe(MockTestStatus.DRAFT);
      expect(mockTestModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Practice Think Set',
          status: MockTestStatus.DRAFT,
          totalMarks: 5,
          totalQuestions: 2,
        }),
      );
    });

    it('rejects invalid question references', async () => {
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue([]),
      });

      await expect(
        service.create(superAdmin, validCreateDto()),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects non-approved questions', async () => {
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue([
          {
            id: questionA,
            status: QuestionStatus.DRAFT,
            cognitiveDomain: CognitiveDomain.THINK,
          },
          {
            id: questionB,
            status: QuestionStatus.APPROVED,
            cognitiveDomain: CognitiveDomain.THINK,
          },
        ]),
      });

      await expect(
        service.create(superAdmin, validCreateDto()),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects duplicate questions', async () => {
      await expect(
        service.create(
          superAdmin,
          validCreateDto({
            questions: [
              { questionId: questionA, marks: 2, order: 1 },
              { questionId: questionA, marks: 3, order: 2 },
            ],
          }),
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects duplicate order values', async () => {
      await expect(
        service.create(
          superAdmin,
          validCreateDto({
            questions: [
              { questionId: questionA, marks: 2, order: 1 },
              { questionId: questionB, marks: 3, order: 1 },
            ],
          }),
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects duplicate section domains', async () => {
      mockApprovedQuestions();

      await expect(
        service.create(
          superAdmin,
          validCreateDto({
            sections: [
              {
                cognitiveDomain: CognitiveDomain.THINK,
                title: 'Think A',
                marks: 2,
                questionCount: 1,
              },
              {
                cognitiveDomain: CognitiveDomain.THINK,
                title: 'Think B',
                marks: 3,
                questionCount: 1,
              },
            ],
          }),
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects inconsistent section question counts', async () => {
      mockApprovedQuestions();

      await expect(
        service.create(
          superAdmin,
          validCreateDto({
            sections: [
              {
                cognitiveDomain: CognitiveDomain.THINK,
                title: 'Think',
                marks: 5,
                questionCount: 1,
              },
            ],
          }),
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects inconsistent section marks', async () => {
      mockApprovedQuestions();

      await expect(
        service.create(
          superAdmin,
          validCreateDto({
            sections: [
              {
                cognitiveDomain: CognitiveDomain.THINK,
                title: 'Think',
                marks: 20,
                questionCount: 2,
              },
            ],
          }),
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects inconsistent totalQuestions', async () => {
      mockApprovedQuestions();

      await expect(
        service.create(superAdmin, validCreateDto({ totalQuestions: 10 })),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects inconsistent totalMarks', async () => {
      mockApprovedQuestions();

      await expect(
        service.create(superAdmin, validCreateDto({ totalMarks: 100 })),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects questions whose domain is undeclared', async () => {
      mockApprovedQuestions([
        {
          id: questionA,
          _id: questionA,
          status: QuestionStatus.APPROVED,
          cognitiveDomain: CognitiveDomain.CREATE,
        },
        {
          id: questionB,
          _id: questionB,
          status: QuestionStatus.APPROVED,
          cognitiveDomain: CognitiveDomain.THINK,
        },
      ]);

      await expect(
        service.create(superAdmin, validCreateDto()),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('list/get/update', () => {
    it('lists with search, status, and cognitiveDomain filters', async () => {
      mockTestModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([createMockTestDoc()]),
      });
      mockTestModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(1),
      });

      const result = await service.list(superAdmin, {
        page: 1,
        limit: 10,
        search: 'Practice',
        status: MockTestStatus.DRAFT,
        cognitiveDomain: CognitiveDomain.THINK,
      });

      expect(result.total).toBe(1);
      expect(mockTestModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          status: MockTestStatus.DRAFT,
          'sections.cognitiveDomain': CognitiveDomain.THINK,
        }),
      );
    });

    it('applies pagination offsets', async () => {
      const skip = vi.fn().mockReturnThis();
      const limit = vi.fn().mockReturnThis();
      mockTestModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip,
        limit,
        exec: vi.fn().mockResolvedValue([]),
      });
      mockTestModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(0),
      });

      await service.list(superAdmin, { page: 3, limit: 5 });

      expect(skip).toHaveBeenCalledWith(10);
      expect(limit).toHaveBeenCalledWith(5);
    });

    it('gets a mock test by id', async () => {
      mockTestModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createMockTestDoc()),
      });

      await expect(
        service.getById(superAdmin, mockTestId),
      ).resolves.toBeTruthy();
    });

    it('rejects invalid ObjectIds', async () => {
      await expect(
        service.getById(superAdmin, 'bad-id'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('updates a draft mock test', async () => {
      const doc = createMockTestDoc();
      mockTestModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(doc),
      });
      mockApprovedQuestions();

      const result = await service.update(superAdmin, mockTestId, {
        title: 'Updated practice set',
      });
      expect(result.title).toBe('Updated practice set');
    });

    it('rejects published mock test edits', async () => {
      mockTestModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createMockTestDoc({ status: MockTestStatus.PUBLISHED }),
        ),
      });

      await expect(
        service.update(superAdmin, mockTestId, { title: 'Nope' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects archived mock test edits', async () => {
      mockTestModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createMockTestDoc({ status: MockTestStatus.ARCHIVED }),
        ),
      });

      await expect(
        service.update(superAdmin, mockTestId, { title: 'Nope' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('lifecycle and publish', () => {
    it('rejects invalid lifecycle transitions', async () => {
      mockTestModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createMockTestDoc()),
      });

      await expect(
        service.updateStatus(superAdmin, mockTestId, {
          status: MockTestStatus.ARCHIVED,
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('publishes a mock test into an immutable version with QuestionVersion refs', async () => {
      const doc = createMockTestDoc();
      mockTestModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(doc),
      });
      mockApprovedQuestions();
      questionVersionModel.findOne.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        exec: vi
          .fn()
          .mockResolvedValueOnce({ _id: questionVersionA, version: 1 })
          .mockResolvedValueOnce({ _id: questionVersionB, version: 2 }),
      });
      mockTestVersionModel.findOne.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(null),
      });
      mockTestVersionModel.create.mockResolvedValue({
        id: versionId,
        version: 1,
      });

      const result = await service.updateStatus(superAdmin, mockTestId, {
        status: MockTestStatus.PUBLISHED,
      });

      expect(result.status).toBe(MockTestStatus.PUBLISHED);
      expect(mockTestVersionModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          version: 1,
          totalMarks: 5,
          totalQuestions: 2,
        }),
      );
      const payload = mockTestVersionModel.create.mock.calls[0][0];
      expect(payload.questions).toEqual([
        expect.objectContaining({
          questionId: questionA,
          questionVersionId: questionVersionA,
          cognitiveDomain: CognitiveDomain.THINK,
          marks: 2,
          order: 1,
        }),
        expect.objectContaining({
          questionId: questionB,
          questionVersionId: questionVersionB,
          cognitiveDomain: CognitiveDomain.THINK,
          marks: 3,
          order: 2,
        }),
      ]);
    });
  });

  describe('versions', () => {
    it('lists mock test versions', async () => {
      mockTestModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createMockTestDoc()),
      });
      mockTestVersionModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([{ id: versionId, version: 1 }]),
      });

      const result = await service.listVersions(superAdmin, mockTestId);
      expect(result).toHaveLength(1);
    });

    it('gets a mock test version by id', async () => {
      mockTestModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createMockTestDoc()),
      });
      mockTestVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue({
          id: versionId,
          mockTestId: { toString: () => mockTestId },
        }),
      });

      await expect(
        service.getVersion(superAdmin, mockTestId, versionId),
      ).resolves.toBeTruthy();
    });
  });
});
