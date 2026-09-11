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

  describe('student-facing approved questions', () => {
    function mockApprovedFind(docs: Record<string, unknown>[]) {
      questionModel.find.mockReturnValue({
        select: vi.fn().mockReturnThis(),
        lean: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(docs),
      });
    }

    it('returns only safe fields for APPROVED questions', async () => {
      mockApprovedFind([
        {
          _id: { toString: () => questionId },
          questionText: 'What is 2 + 2?',
          questionType: QuestionType.MCQ,
          cognitiveDomain: CognitiveDomain.THINK,
          difficulty: QuestionDifficulty.EASY,
          options: [
            { id: 'A', text: '3' },
            { id: 'B', text: '4' },
          ],
          marks: 2,
          externalId: 'THINK_001',
          correctOptionIds: ['B'],
          explanation: 'secret',
          generation: { source: QuestionSource.AI },
        },
      ]);

      const result = await service.listApproved({});

      expect(questionModel.find).toHaveBeenCalledWith({
        status: QuestionStatus.APPROVED,
      });
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: questionId,
        questionText: 'What is 2 + 2?',
        questionType: QuestionType.MCQ,
        cognitiveDomain: CognitiveDomain.THINK,
        difficulty: QuestionDifficulty.EASY,
        options: [
          { id: 'A', text: '3' },
          { id: 'B', text: '4' },
        ],
        marks: 2,
      });
      expect(result[0]).not.toHaveProperty('correctOptionIds');
      expect(result[0]).not.toHaveProperty('explanation');
      expect(result[0]).not.toHaveProperty('generation');
      expect(result[0]).not.toHaveProperty('externalId');
    });

    it('applies optional cognitiveDomain and difficulty filters', async () => {
      mockApprovedFind([]);

      await service.listApproved({
        cognitiveDomain: CognitiveDomain.SOLVE,
        difficulty: QuestionDifficulty.HARD,
      });

      expect(questionModel.find).toHaveBeenCalledWith({
        status: QuestionStatus.APPROVED,
        cognitiveDomain: CognitiveDomain.SOLVE,
        difficulty: QuestionDifficulty.HARD,
      });
    });

    it('returns a demo exam payload sorted by domain then externalId', async () => {
      mockApprovedFind([
        {
          _id: { toString: () => 'id-analyse' },
          questionText: 'Analyse Q',
          questionType: QuestionType.MCQ,
          cognitiveDomain: CognitiveDomain.ANALYSE,
          difficulty: QuestionDifficulty.MEDIUM,
          options: [{ id: 'A', text: '1' }, { id: 'B', text: '2' }],
          marks: 2,
          externalId: 'ANALYSE_001',
        },
        {
          _id: { toString: () => 'id-think-2' },
          questionText: 'Think Q2',
          questionType: QuestionType.MCQ,
          cognitiveDomain: CognitiveDomain.THINK,
          difficulty: QuestionDifficulty.HARD,
          options: [{ id: 'A', text: '1' }, { id: 'B', text: '2' }],
          marks: 2,
          externalId: 'THINK_002',
        },
        {
          _id: { toString: () => 'id-think-1' },
          questionText: 'Think Q1',
          questionType: QuestionType.MCQ,
          cognitiveDomain: CognitiveDomain.THINK,
          difficulty: QuestionDifficulty.MEDIUM,
          options: [{ id: 'A', text: '1' }, { id: 'B', text: '2' }],
          marks: 2,
          externalId: 'THINK_001',
        },
      ]);

      const demo = await service.getDemoExamQuestions();

      expect(demo.title).toBe('The IQ Olympiad');
      expect(demo.totalQuestions).toBe(3);
      expect(demo.totalMarks).toBe(6);
      expect(demo.marksPerQuestion).toBe(2);
      expect(demo.questions.map((q) => q.id)).toEqual([
        'id-think-1',
        'id-think-2',
        'id-analyse',
      ]);
    });

    it('throws NotFound when no approved demo questions exist', async () => {
      mockApprovedFind([]);

      await expect(service.getDemoExamQuestions()).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('submitDemoExam', () => {
    const thinkId = '64b64c4f2f1c2a3b4c5d6eb1';
    const analyseId = '64b64c4f2f1c2a3b4c5d6eb5';
    const solveId = '64b64c4f2f1c2a3b4c5d6eb6';

    function paperQuestion(
      id: string,
      domain: CognitiveDomain,
      correct: string,
      externalId: string,
    ) {
      return {
        _id: { toString: () => id },
        cognitiveDomain: domain,
        marks: 2,
        options: [
          { id: 'A', text: '1' },
          { id: 'B', text: '2' },
          { id: 'C', text: '3' },
          { id: 'D', text: '4' },
        ],
        correctOptionIds: [correct],
        externalId,
      };
    }

    function mockPaper(docs: Record<string, unknown>[]) {
      questionModel.find.mockReturnValue({
        select: vi.fn().mockReturnThis(),
        lean: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(docs),
      });
    }

    const defaultPaper = [
      paperQuestion(thinkId, CognitiveDomain.THINK, 'A', 'THINK_001'),
      paperQuestion(analyseId, CognitiveDomain.ANALYSE, 'B', 'ANALYSE_001'),
      paperQuestion(solveId, CognitiveDomain.SOLVE, 'C', 'SOLVE_001'),
    ];

    it('scores all correct answers', async () => {
      mockPaper(defaultPaper);

      const result = await service.submitDemoExam({
        answers: [
          { questionId: thinkId, selectedOptionIds: ['A'] },
          { questionId: analyseId, selectedOptionIds: ['B'] },
          { questionId: solveId, selectedOptionIds: ['C'] },
        ],
      });

      expect(result).toEqual({
        totalScore: 6,
        totalMarks: 6,
        attempted: 3,
        correctAnswers: 3,
        incorrectAnswers: 0,
        unattempted: 0,
        sectionScores: expect.arrayContaining([
          expect.objectContaining({
            cognitiveDomain: CognitiveDomain.THINK,
            score: 2,
            maxScore: 2,
            attempted: 1,
            correct: 1,
          }),
          expect.objectContaining({
            cognitiveDomain: CognitiveDomain.ANALYSE,
            score: 2,
            maxScore: 2,
            attempted: 1,
            correct: 1,
          }),
          expect.objectContaining({
            cognitiveDomain: CognitiveDomain.SOLVE,
            score: 2,
            maxScore: 2,
            attempted: 1,
            correct: 1,
          }),
        ]),
      });
      expect(result).not.toHaveProperty('correctOptionIds');
    });

    it('scores all incorrect answers as zero', async () => {
      mockPaper(defaultPaper);

      const result = await service.submitDemoExam({
        answers: [
          { questionId: thinkId, selectedOptionIds: ['D'] },
          { questionId: analyseId, selectedOptionIds: ['D'] },
          { questionId: solveId, selectedOptionIds: ['D'] },
        ],
      });

      expect(result.totalScore).toBe(0);
      expect(result.correctAnswers).toBe(0);
      expect(result.incorrectAnswers).toBe(3);
      expect(result.attempted).toBe(3);
      expect(result.unattempted).toBe(0);
    });

    it('scores a partially attempted exam', async () => {
      mockPaper(defaultPaper);

      const result = await service.submitDemoExam({
        answers: [
          { questionId: thinkId, selectedOptionIds: ['A'] },
          { questionId: analyseId, selectedOptionIds: ['D'] },
        ],
      });

      expect(result.totalScore).toBe(2);
      expect(result.attempted).toBe(2);
      expect(result.correctAnswers).toBe(1);
      expect(result.incorrectAnswers).toBe(1);
      expect(result.unattempted).toBe(1);
    });

    it('scores a completely unattempted exam', async () => {
      mockPaper(defaultPaper);

      const result = await service.submitDemoExam({ answers: [] });

      expect(result).toMatchObject({
        totalScore: 0,
        totalMarks: 6,
        attempted: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        unattempted: 3,
      });
    });

    it('rejects duplicate question IDs', async () => {
      await expect(
        service.submitDemoExam({
          answers: [
            { questionId: thinkId, selectedOptionIds: ['A'] },
            { questionId: thinkId, selectedOptionIds: ['B'] },
          ],
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects non-existent question IDs', async () => {
      mockPaper(defaultPaper);
      const unknownId = '64b64c4f2f1c2a3b4c5d6eff';

      await expect(
        service.submitDemoExam({
          answers: [{ questionId: unknownId, selectedOptionIds: ['A'] }],
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects invalid option IDs', async () => {
      mockPaper(defaultPaper);

      await expect(
        service.submitDemoExam({
          answers: [{ questionId: thinkId, selectedOptionIds: ['Z'] }],
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('calculates section-wise scores across domains', async () => {
      mockPaper(defaultPaper);

      const result = await service.submitDemoExam({
        answers: [
          { questionId: thinkId, selectedOptionIds: ['A'] },
          { questionId: analyseId, selectedOptionIds: ['A'] },
        ],
      });

      const think = result.sectionScores.find(
        (s) => s.cognitiveDomain === CognitiveDomain.THINK,
      );
      const analyse = result.sectionScores.find(
        (s) => s.cognitiveDomain === CognitiveDomain.ANALYSE,
      );
      const solve = result.sectionScores.find(
        (s) => s.cognitiveDomain === CognitiveDomain.SOLVE,
      );

      expect(think).toMatchObject({
        score: 2,
        maxScore: 2,
        attempted: 1,
        correct: 1,
      });
      expect(analyse).toMatchObject({
        score: 0,
        maxScore: 2,
        attempted: 1,
        correct: 0,
      });
      expect(solve).toMatchObject({
        score: 0,
        maxScore: 2,
        attempted: 0,
        correct: 0,
      });
    });

    it('treats empty selectedOptionIds as unattempted', async () => {
      mockPaper(defaultPaper);

      const result = await service.submitDemoExam({
        answers: [{ questionId: thinkId, selectedOptionIds: [] }],
      });

      expect(result.attempted).toBe(0);
      expect(result.unattempted).toBe(3);
      expect(result.totalScore).toBe(0);
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
