import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { CognitiveDomain } from '../common/enums/cognitive-domain.enum.js';
import { MockTestAttemptStatus } from '../common/enums/mock-test-attempt-status.enum.js';
import { MockTestStatus } from '../common/enums/mock-test-status.enum.js';
import { QuestionType } from '../common/enums/question-type.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { MockTestAttemptsService } from './mock-test-attempts.service.js';

const attemptId = '64b64c4f2f1c2a3b4c5d6f01';
const mockTestId = '64b64c4f2f1c2a3b4c5d6f02';
const versionId = '64b64c4f2f1c2a3b4c5d6f03';
const studentId = '64b64c4f2f1c2a3b4c5d6f04';
const otherStudentId = '64b64c4f2f1c2a3b4c5d6f05';
const userId = '64b64c4f2f1c2a3b4c5d6f06';
const questionA = '64b64c4f2f1c2a3b4c5d6f11';
const questionB = '64b64c4f2f1c2a3b4c5d6f12';
const questionC = '64b64c4f2f1c2a3b4c5d6f13';
const qvA = '64b64c4f2f1c2a3b4c5d6f14';
const qvB = '64b64c4f2f1c2a3b4c5d6f15';
const qvC = '64b64c4f2f1c2a3b4c5d6f16';

function idRef(value: string) {
  return { toString: () => value };
}

function createVersion(overrides: Record<string, unknown> = {}) {
  return {
    id: versionId,
    _id: idRef(versionId),
    mockTestId: idRef(mockTestId),
    version: 1,
    title: 'Practice paper',
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
      {
        questionId: idRef(questionA),
        questionVersionId: idRef(qvA),
        cognitiveDomain: CognitiveDomain.THINK,
        marks: 2,
        order: 1,
      },
      {
        questionId: idRef(questionB),
        questionVersionId: idRef(qvB),
        cognitiveDomain: CognitiveDomain.THINK,
        marks: 3,
        order: 2,
      },
    ],
    ...overrides,
  };
}

function createQuestionVersions(includeOpenEnded = false) {
  const docs = [
    {
      id: qvA,
      _id: idRef(qvA),
      questionId: idRef(questionA),
      questionText: 'MCQ prompt',
      questionType: QuestionType.MCQ,
      options: [
        { id: 'a1', text: 'One' },
        { id: 'a2', text: 'Two' },
      ],
      correctOptionIds: ['a1'],
      expectedAnswer: 'secret-mcq',
      evaluationCriteria: 'hidden-mcq',
      explanation: 'because a1',
      cognitiveDomain: CognitiveDomain.THINK,
      marks: 2,
    },
    {
      id: qvB,
      _id: idRef(qvB),
      questionId: idRef(questionB),
      questionText: 'Multi prompt',
      questionType: QuestionType.MULTIPLE_SELECT,
      options: [
        { id: 'b1', text: 'Left' },
        { id: 'b2', text: 'Right' },
        { id: 'b3', text: 'Extra' },
      ],
      correctOptionIds: ['b1', 'b2'],
      expectedAnswer: 'secret-multi',
      evaluationCriteria: 'hidden-multi',
      explanation: 'b1 and b2',
      cognitiveDomain: CognitiveDomain.THINK,
      marks: 3,
    },
  ];

  if (includeOpenEnded) {
    docs.push({
      id: qvC,
      _id: idRef(qvC),
      questionId: idRef(questionC),
      questionText: 'Explain thinking',
      questionType: QuestionType.OPEN_ENDED,
      options: [],
      correctOptionIds: [],
      expectedAnswer: 'model answer',
      evaluationCriteria: 'rubric',
      explanation: 'oe-expl',
      cognitiveDomain: CognitiveDomain.CREATE,
      marks: 4,
    });
  }

  return docs;
}

function createAttemptDoc(overrides: Record<string, unknown> = {}) {
  return {
    id: attemptId,
    _id: idRef(attemptId),
    studentId: idRef(studentId),
    mockTestId: idRef(mockTestId),
    mockTestVersionId: idRef(versionId),
    status: MockTestAttemptStatus.NOT_STARTED,
    answers: [],
    sectionScores: [],
    totalScore: 0,
    totalMarks: 5,
    startedAt: undefined,
    submittedAt: undefined,
    evaluatedAt: undefined,
    ...overrides,
  };
}

describe('MockTestAttemptsService', () => {
  const session = {
    withTransaction: vi.fn(async (work: () => Promise<unknown>) => work()),
    endSession: vi.fn(),
  };
  const connection = {
    startSession: vi.fn().mockResolvedValue(session),
  };
  const attemptModel = {
    create: vi.fn(),
    findById: vi.fn(),
    find: vi.fn(),
    findOneAndUpdate: vi.fn(),
    countDocuments: vi.fn(),
  };
  const mockTestModel = {
    findById: vi.fn(),
  };
  const mockTestVersionModel = {
    findOne: vi.fn(),
    findById: vi.fn(),
  };
  const questionVersionModel = {
    find: vi.fn(),
  };
  const studentsService = {
    findByUserId: vi.fn(),
  };
  const entitlementsService = {
    consumeMockTestAttempt: vi.fn(),
  };

  let service: MockTestAttemptsService;

  const student: AuthUser = {
    userId,
    email: 'student@example.com',
    roles: [UserRole.STUDENT],
  };
  const admin: AuthUser = {
    userId,
    email: 'admin@example.com',
    roles: [UserRole.SUPER_ADMIN],
  };

  function mockPublishedTest() {
    mockTestModel.findById.mockReturnValue({
      exec: vi.fn().mockResolvedValue({
        _id: idRef(mockTestId),
        status: MockTestStatus.PUBLISHED,
      }),
    });
    mockTestVersionModel.findOne.mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      exec: vi.fn().mockResolvedValue(createVersion()),
    });
    mockTestVersionModel.findById.mockReturnValue({
      exec: vi.fn().mockResolvedValue(createVersion()),
    });
  }

  function mockQuestionVersions(includeOpenEnded = false) {
    questionVersionModel.find.mockReturnValue({
      exec: vi.fn().mockResolvedValue(createQuestionVersions(includeOpenEnded)),
    });
  }

  beforeEach(() => {
    vi.clearAllMocks();
    connection.startSession.mockResolvedValue(session);
    session.withTransaction.mockImplementation(async (work) => work());
    studentsService.findByUserId.mockResolvedValue({ _id: idRef(studentId) });
    entitlementsService.consumeMockTestAttempt.mockResolvedValue({});
    service = new MockTestAttemptsService(
      connection as never,
      attemptModel as never,
      mockTestModel as never,
      mockTestVersionModel as never,
      questionVersionModel as never,
      studentsService as never,
      entitlementsService as never,
    );
  });

  describe('access', () => {
    it('rejects non-student create', async () => {
      await expect(service.create(admin, mockTestId)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });

    it('rejects missing StudentProfile', async () => {
      studentsService.findByUserId.mockRejectedValue(
        new NotFoundException('Student profile not found'),
      );
      await expect(service.create(student, mockTestId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('rejects unpublished mock tests', async () => {
      mockTestModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue({
          _id: idRef(mockTestId),
          status: MockTestStatus.DRAFT,
        }),
      });

      await expect(service.create(student, mockTestId)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(entitlementsService.consumeMockTestAttempt).not.toHaveBeenCalled();
    });

    it('rejects a published mock test without a MockTestVersion', async () => {
      mockTestModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue({
          _id: idRef(mockTestId),
          status: MockTestStatus.PUBLISHED,
        }),
      });
      mockTestVersionModel.findOne.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(null),
      });

      await expect(service.create(student, mockTestId)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });

    it('creates an attempt and consumes one entitlement', async () => {
      mockPublishedTest();
      const created = createAttemptDoc();
      attemptModel.create.mockResolvedValue([created]);

      const result = await service.create(student, mockTestId);

      expect(result.status).toBe(MockTestAttemptStatus.NOT_STARTED);
      expect(entitlementsService.consumeMockTestAttempt).toHaveBeenCalledWith(
        expect.objectContaining({
          studentId: expect.anything(),
          mockTestAttemptId: created._id,
        }),
      );
      expect(session.withTransaction).toHaveBeenCalled();
    });

    it('allows multiple attempts for the same mock test', async () => {
      mockPublishedTest();
      attemptModel.create
        .mockResolvedValueOnce([createAttemptDoc()])
        .mockResolvedValueOnce([createAttemptDoc({ id: '64b64c4f2f1c2a3b4c5d6f99' })]);

      await service.create(student, mockTestId);
      await service.create(student, mockTestId);

      expect(attemptModel.create).toHaveBeenCalledTimes(2);
      expect(entitlementsService.consumeMockTestAttempt).toHaveBeenCalledTimes(2);
    });

    it('rejects create when entitlement consumption is denied', async () => {
      mockPublishedTest();
      attemptModel.create.mockResolvedValue([createAttemptDoc()]);
      entitlementsService.consumeMockTestAttempt.mockRejectedValue(
        new ForbiddenException('No remaining mock test attempts'),
      );

      await expect(service.create(student, mockTestId)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });
  });

  describe('start and ownership', () => {
    it('starts a NOT_STARTED attempt', async () => {
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createAttemptDoc()),
      });
      mockTestVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion()),
      });
      const started = createAttemptDoc({
        status: MockTestAttemptStatus.IN_PROGRESS,
        startedAt: new Date(),
      });
      attemptModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(started),
      });

      const result = await service.start(student, attemptId);
      expect(result.status).toBe(MockTestAttemptStatus.IN_PROGRESS);
      expect(attemptModel.findOneAndUpdate).toHaveBeenCalledWith(
        expect.objectContaining({ status: MockTestAttemptStatus.NOT_STARTED }),
        expect.objectContaining({
          $set: expect.objectContaining({
            status: MockTestAttemptStatus.IN_PROGRESS,
          }),
        }),
        { new: true },
      );
    });

    it('rejects starting twice', async () => {
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({ status: MockTestAttemptStatus.IN_PROGRESS }),
        ),
      });
      mockTestVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion()),
      });

      await expect(service.start(student, attemptId)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });

    it('enforces attempt ownership', async () => {
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({ studentId: idRef(otherStudentId) }),
        ),
      });

      await expect(service.getById(student, attemptId)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });
  });

  describe('answers', () => {
    function mockInProgress() {
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: MockTestAttemptStatus.IN_PROGRESS,
            startedAt: new Date(),
          }),
        ),
      });
      mockTestVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion()),
      });
      mockQuestionVersions();
    }

    it('saves an MCQ answer', async () => {
      mockInProgress();
      const saved = createAttemptDoc({
        status: MockTestAttemptStatus.IN_PROGRESS,
        startedAt: new Date(),
        answers: [
          { questionId: idRef(questionA), selectedOptionIds: ['a1'], marksAwarded: 0 },
        ],
      });
      attemptModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(saved),
      });

      const result = await service.saveAnswers(student, attemptId, {
        answers: [{ questionId: questionA, selectedOptionIds: ['a1'] }],
      });
      expect(result.answers[0]?.selectedOptionIds).toEqual(['a1']);
      expect(result.answers[0]).not.toHaveProperty('isCorrect');
    });

    it('saves a multiple-select answer', async () => {
      mockInProgress();
      const saved = createAttemptDoc({
        status: MockTestAttemptStatus.IN_PROGRESS,
        startedAt: new Date(),
        answers: [
          {
            questionId: idRef(questionB),
            selectedOptionIds: ['b1', 'b2'],
            marksAwarded: 0,
          },
        ],
      });
      attemptModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(saved),
      });

      const result = await service.saveAnswers(student, attemptId, {
        answers: [{ questionId: questionB, selectedOptionIds: ['b1', 'b2'] }],
      });
      expect(result.answers[0]?.selectedOptionIds).toEqual(['b1', 'b2']);
    });

    it('saves an open-ended answer', async () => {
      const version = createVersion({
        totalMarks: 9,
        totalQuestions: 3,
        sections: [
          {
            cognitiveDomain: CognitiveDomain.THINK,
            title: 'Think',
            marks: 5,
            questionCount: 2,
          },
          {
            cognitiveDomain: CognitiveDomain.CREATE,
            title: 'Create',
            marks: 4,
            questionCount: 1,
          },
        ],
        questions: [
          ...createVersion().questions,
          {
            questionId: idRef(questionC),
            questionVersionId: idRef(qvC),
            cognitiveDomain: CognitiveDomain.CREATE,
            marks: 4,
            order: 3,
          },
        ],
      });
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: MockTestAttemptStatus.IN_PROGRESS,
            startedAt: new Date(),
            totalMarks: 9,
          }),
        ),
      });
      mockTestVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(version),
      });
      mockQuestionVersions(true);
      const saved = createAttemptDoc({
        status: MockTestAttemptStatus.IN_PROGRESS,
        answers: [
          {
            questionId: idRef(questionC),
            responseText: 'My reasoning',
            marksAwarded: 0,
          },
        ],
      });
      attemptModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(saved),
      });

      const result = await service.saveAnswers(student, attemptId, {
        answers: [{ questionId: questionC, responseText: 'My reasoning' }],
      });
      expect(result.answers[0]?.responseText).toBe('My reasoning');
    });

    it('rejects answers for questions outside the version', async () => {
      mockInProgress();

      await expect(
        service.saveAnswers(student, attemptId, {
          answers: [
            {
              questionId: '64b64c4f2f1c2a3b4c5d6f77',
              selectedOptionIds: ['a1'],
            },
          ],
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects invalid option IDs', async () => {
      mockInProgress();

      await expect(
        service.saveAnswers(student, attemptId, {
          answers: [{ questionId: questionA, selectedOptionIds: ['nope'] }],
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects duplicate question answers in one payload', async () => {
      mockInProgress();

      await expect(
        service.saveAnswers(student, attemptId, {
          answers: [
            { questionId: questionA, selectedOptionIds: ['a1'] },
            { questionId: questionA, selectedOptionIds: ['a2'] },
          ],
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects answer changes after submit', async () => {
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({ status: MockTestAttemptStatus.SUBMITTED }),
        ),
      });
      mockTestVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion()),
      });

      await expect(
        service.saveAnswers(student, attemptId, {
          answers: [{ questionId: questionA, selectedOptionIds: ['a1'] }],
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('submit and scoring', () => {
    it('scores objective questions, section totals, and auto-evaluates', async () => {
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: MockTestAttemptStatus.IN_PROGRESS,
            startedAt: new Date(),
            answers: [
              {
                questionId: idRef(questionA),
                selectedOptionIds: ['a1'],
                marksAwarded: 0,
              },
              {
                questionId: idRef(questionB),
                selectedOptionIds: ['b1', 'b2'],
                marksAwarded: 0,
              },
            ],
          }),
        ),
      });
      mockTestVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion()),
      });
      mockQuestionVersions();
      attemptModel.findOneAndUpdate.mockImplementation((_filter, update) => ({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: update.$set.status,
            answers: update.$set.answers,
            sectionScores: update.$set.sectionScores,
            totalScore: update.$set.totalScore,
            totalMarks: update.$set.totalMarks,
            submittedAt: update.$set.submittedAt,
            evaluatedAt: update.$set.evaluatedAt,
          }),
        ),
      }));

      const result = await service.submit(student, attemptId);

      expect(result.status).toBe(MockTestAttemptStatus.EVALUATED);
      expect(result.totalScore).toBe(5);
      expect(result.sectionScores?.[0]).toMatchObject({
        cognitiveDomain: CognitiveDomain.THINK,
        score: 5,
        maxScore: 5,
      });
      expect(
        attemptModel.findOneAndUpdate.mock.calls[0][1].$set.answers.every(
          (answer: { marksAwarded: number; isCorrect: boolean }) =>
            answer.marksAwarded > 0 && answer.isCorrect,
        ),
      ).toBe(true);
    });

    it('keeps OPEN_ENDED attempts SUBMITTED without inventing a score', async () => {
      const version = createVersion({
        totalMarks: 4,
        totalQuestions: 1,
        sections: [
          {
            cognitiveDomain: CognitiveDomain.CREATE,
            title: 'Create',
            marks: 4,
            questionCount: 1,
          },
        ],
        questions: [
          {
            questionId: idRef(questionC),
            questionVersionId: idRef(qvC),
            cognitiveDomain: CognitiveDomain.CREATE,
            marks: 4,
            order: 1,
          },
        ],
      });
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: MockTestAttemptStatus.IN_PROGRESS,
            startedAt: new Date(),
            totalMarks: 4,
            answers: [
              {
                questionId: idRef(questionC),
                responseText: 'An essay',
                marksAwarded: 0,
              },
            ],
          }),
        ),
      });
      mockTestVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(version),
      });
      questionVersionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createQuestionVersions(true).slice(-1)),
      });
      attemptModel.findOneAndUpdate.mockImplementation((_filter, update) => ({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: update.$set.status,
            answers: update.$set.answers,
            sectionScores: update.$set.sectionScores,
            totalScore: update.$set.totalScore,
            submittedAt: update.$set.submittedAt,
            evaluatedAt: update.$set.evaluatedAt,
          }),
        ),
      }));

      const result = await service.submit(student, attemptId);
      expect(result.status).toBe(MockTestAttemptStatus.SUBMITTED);
      expect(result.totalScore).toBe(0);
      expect(result.answers[0]?.isCorrect).toBeUndefined();
      expect(result.evaluatedAt).toBeUndefined();
    });
  });

  describe('expiry, list, and detail', () => {
    it('expires in-progress attempts after the frozen duration', async () => {
      const startedAt = new Date(Date.now() - 31 * 60_000);
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: MockTestAttemptStatus.IN_PROGRESS,
            startedAt,
          }),
        ),
      });
      mockTestVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion()),
      });
      attemptModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: MockTestAttemptStatus.EXPIRED,
            startedAt,
          }),
        ),
      });

      await expect(service.submit(student, attemptId)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(attemptModel.findOneAndUpdate).toHaveBeenCalledWith(
        expect.objectContaining({ status: MockTestAttemptStatus.IN_PROGRESS }),
        { $set: { status: MockTestAttemptStatus.EXPIRED } },
        { new: true },
      );
    });

    it('lists own attempts with filters and pagination', async () => {
      const skip = vi.fn().mockReturnThis();
      const limit = vi.fn().mockReturnThis();
      attemptModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip,
        limit,
        exec: vi.fn().mockResolvedValue([createAttemptDoc()]),
      });
      attemptModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(1),
      });
      mockTestVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion()),
      });

      const result = await service.listMine(student, {
        page: 2,
        limit: 5,
        status: MockTestAttemptStatus.NOT_STARTED,
        mockTestId,
      });

      expect(result.total).toBe(1);
      expect(skip).toHaveBeenCalledWith(5);
      expect(limit).toHaveBeenCalledWith(5);
      expect(attemptModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          status: MockTestAttemptStatus.NOT_STARTED,
          mockTestId,
        }),
      );
    });

    it('returns attempt detail to the owner without leaking answers before evaluation', async () => {
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: MockTestAttemptStatus.IN_PROGRESS,
            startedAt: new Date(),
            answers: [
              {
                questionId: idRef(questionA),
                selectedOptionIds: ['a1'],
                marksAwarded: 0,
              },
            ],
          }),
        ),
      });
      mockTestVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion()),
      });
      mockQuestionVersions();

      const result = await service.getById(student, attemptId);
      expect(result.questions).toHaveLength(2);
      expect(result.questions?.[0]).not.toHaveProperty('correctOptionIds');
      expect(result.questions?.[0]).not.toHaveProperty('expectedAnswer');
      expect(result.questions?.[0]).not.toHaveProperty('evaluationCriteria');
      expect(result.questions?.[0]).not.toHaveProperty('explanation');
      expect(result.answers[0]).not.toHaveProperty('isCorrect');
      expect(result.answers[0]).not.toHaveProperty('marksAwarded');
      expect(result.totalScore).toBeUndefined();
    });

    it('rejects invalid ObjectIds', async () => {
      await expect(service.getById(student, 'bad-id')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
