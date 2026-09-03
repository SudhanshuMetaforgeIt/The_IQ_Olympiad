import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { CognitiveDomain } from '../common/enums/cognitive-domain.enum.js';
import { QuestionDifficulty } from '../common/enums/question-difficulty.enum.js';
import { QuestionSource } from '../common/enums/question-source.enum.js';
import { QuestionStatus } from '../common/enums/question-status.enum.js';
import { QuestionType } from '../common/enums/question-type.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import type { CreateQuestionDto } from './dto/questions.dto.js';
import { QuestionsService } from './questions.service.js';

const questionId = '64b64c4f2f1c2a3b4c5d6eb1';
const versionId = '64b64c4f2f1c2a3b4c5d6eb2';
const userId = '64b64c4f2f1c2a3b4c5d6eb3';

function mcqDto(
  overrides: Partial<CreateQuestionDto> = {},
): CreateQuestionDto {
  return {
    questionText: 'What is 2 + 2?',
    questionType: QuestionType.MCQ,
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '4' },
    ],
    correctOptionIds: ['b'],
    cognitiveDomain: CognitiveDomain.THINK,
    difficulty: QuestionDifficulty.EASY,
    marks: 2,
    generation: { source: QuestionSource.MANUAL },
    ...overrides,
  };
}

function createQuestionDoc(overrides: Record<string, unknown> = {}) {
  return {
    id: questionId,
    _id: questionId,
    questionText: 'What is 2 + 2?',
    questionType: QuestionType.MCQ,
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '4' },
    ],
    correctOptionIds: ['b'],
    cognitiveDomain: CognitiveDomain.THINK,
    difficulty: QuestionDifficulty.EASY,
    marks: 2,
    generation: { source: QuestionSource.MANUAL },
    status: QuestionStatus.DRAFT,
    usageCount: 0,
    save: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

describe('QuestionsService', () => {
  const questionModel = {
    create: vi.fn(),
    findById: vi.fn(),
    find: vi.fn(),
    countDocuments: vi.fn(),
  };

  const questionVersionModel = {
    create: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    findById: vi.fn(),
  };

  let service: QuestionsService;

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

  const schoolAdmin: AuthUser = {
    userId,
    email: 'school@example.com',
    roles: [UserRole.SCHOOL_ADMIN],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    service = new QuestionsService(
      questionModel as never,
      questionVersionModel as never,
    );
  });

  describe('access control', () => {
    it('rejects STUDENT create', async () => {
      await expect(service.create(student, mcqDto())).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });

    it('rejects SCHOOL_ADMIN list', async () => {
      await expect(
        service.list(schoolAdmin, { page: 1, limit: 10 }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('create', () => {
    it('creates a DRAFT MCQ question', async () => {
      const created = createQuestionDoc();
      questionModel.create.mockResolvedValue(created);

      const result = await service.create(superAdmin, mcqDto());

      expect(result).toBe(created);
      expect(questionModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          status: QuestionStatus.DRAFT,
          usageCount: 0,
          questionType: QuestionType.MCQ,
        }),
      );
    });

    it('creates a MULTIPLE_SELECT question', async () => {
      questionModel.create.mockResolvedValue(createQuestionDoc());

      await service.create(
        superAdmin,
        mcqDto({
          questionType: QuestionType.MULTIPLE_SELECT,
          correctOptionIds: ['a', 'b'],
        }),
      );

      expect(questionModel.create).toHaveBeenCalled();
    });

    it('creates an OPEN_ENDED question', async () => {
      questionModel.create.mockResolvedValue(createQuestionDoc());

      await service.create(
        superAdmin,
        mcqDto({
          questionType: QuestionType.OPEN_ENDED,
          options: [],
          correctOptionIds: [],
          expectedAnswer: 'Photosynthesis',
          evaluationCriteria: 'Mentions chlorophyll and sunlight',
        }),
      );

      expect(questionModel.create).toHaveBeenCalled();
    });

    it('rejects MCQ with missing options', async () => {
      await expect(
        service.create(superAdmin, mcqDto({ options: [{ id: 'a', text: '3' }] })),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects MCQ with invalid correctOptionIds', async () => {
      await expect(
        service.create(superAdmin, mcqDto({ correctOptionIds: ['z'] })),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects duplicate option IDs', async () => {
      await expect(
        service.create(
          superAdmin,
          mcqDto({
            options: [
              { id: 'a', text: '3' },
              { id: 'a', text: '4' },
            ],
          }),
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects OPEN_ENDED without evaluation fields', async () => {
      await expect(
        service.create(
          superAdmin,
          mcqDto({
            questionType: QuestionType.OPEN_ENDED,
            options: [],
            correctOptionIds: [],
          }),
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('list and get', () => {
    it('lists with filters and pagination', async () => {
      questionModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([createQuestionDoc()]),
      });
      questionModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(1),
      });

      const result = await service.list(superAdmin, {
        page: 1,
        limit: 10,
        status: QuestionStatus.DRAFT,
        cognitiveDomain: CognitiveDomain.THINK,
        difficulty: QuestionDifficulty.EASY,
        questionType: QuestionType.MCQ,
        source: QuestionSource.MANUAL,
        search: '2 + 2',
      });

      expect(result.total).toBe(1);
      expect(questionModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          status: QuestionStatus.DRAFT,
          'generation.source': QuestionSource.MANUAL,
        }),
      );
    });

    it('gets a question by id', async () => {
      questionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createQuestionDoc()),
      });

      await expect(service.getById(superAdmin, questionId)).resolves.toBeTruthy();
    });

    it('rejects invalid ObjectIds', async () => {
      await expect(
        service.getById(superAdmin, 'bad-id'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('update', () => {
    it('updates a DRAFT question', async () => {
      const doc = createQuestionDoc();
      questionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(doc),
      });

      const result = await service.update(superAdmin, questionId, {
        questionText: 'Updated prompt',
      });

      expect(result.questionText).toBe('Updated prompt');
      expect(doc.save).toHaveBeenCalled();
    });

    it('rejects archived edits', async () => {
      questionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createQuestionDoc({ status: QuestionStatus.ARCHIVED }),
        ),
      });

      await expect(
        service.update(superAdmin, questionId, { questionText: 'Nope' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects approved edits', async () => {
      questionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createQuestionDoc({ status: QuestionStatus.APPROVED }),
        ),
      });

      await expect(
        service.update(superAdmin, questionId, { questionText: 'Nope' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('lifecycle', () => {
    it('approves a draft and creates an immutable version', async () => {
      const doc = createQuestionDoc();
      questionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(doc),
      });
      questionVersionModel.findOne.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(null),
      });
      questionVersionModel.create.mockResolvedValue({
        id: versionId,
        version: 1,
      });

      const result = await service.updateStatus(superAdmin, questionId, {
        status: QuestionStatus.APPROVED,
      });

      expect(result.status).toBe(QuestionStatus.APPROVED);
      expect(questionVersionModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          questionId,
          version: 1,
          questionText: doc.questionText,
          correctOptionIds: doc.correctOptionIds,
        }),
      );
    });

    it('allows DRAFT to REJECTED', async () => {
      const doc = createQuestionDoc();
      questionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(doc),
      });

      const result = await service.updateStatus(superAdmin, questionId, {
        status: QuestionStatus.REJECTED,
      });

      expect(result.status).toBe(QuestionStatus.REJECTED);
      expect(questionVersionModel.create).not.toHaveBeenCalled();
    });

    it('allows REJECTED to DRAFT', async () => {
      const doc = createQuestionDoc({ status: QuestionStatus.REJECTED });
      questionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(doc),
      });

      const result = await service.updateStatus(superAdmin, questionId, {
        status: QuestionStatus.DRAFT,
      });

      expect(result.status).toBe(QuestionStatus.DRAFT);
    });

    it('rejects invalid ARCHIVED to APPROVED', async () => {
      questionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createQuestionDoc({ status: QuestionStatus.ARCHIVED }),
        ),
      });

      await expect(
        service.updateStatus(superAdmin, questionId, {
          status: QuestionStatus.APPROVED,
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects APPROVED to DRAFT', async () => {
      questionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createQuestionDoc({ status: QuestionStatus.APPROVED }),
        ),
      });

      await expect(
        service.updateStatus(superAdmin, questionId, {
          status: QuestionStatus.DRAFT,
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('versions', () => {
    it('lists versions for a question', async () => {
      questionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createQuestionDoc()),
      });
      questionVersionModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([{ id: versionId, version: 1 }]),
      });

      const result = await service.listVersions(superAdmin, questionId);
      expect(result).toHaveLength(1);
    });

    it('gets a version by id', async () => {
      questionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createQuestionDoc()),
      });
      questionVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue({
          id: versionId,
          questionId: { toString: () => questionId },
          version: 1,
        }),
      });

      await expect(
        service.getVersion(superAdmin, questionId, versionId),
      ).resolves.toBeTruthy();
    });
  });
});
