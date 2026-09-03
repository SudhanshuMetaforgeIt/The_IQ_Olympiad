import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { CognitiveDomain } from '../common/enums/cognitive-domain.enum.js';
import { ExamAttemptStatus } from '../common/enums/exam-attempt-status.enum.js';
import { ExamStatus } from '../common/enums/exam-status.enum.js';
import { OlympiadRegistrationStatus } from '../common/enums/olympiad-registration-status.enum.js';
import { QuestionType } from '../common/enums/question-type.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { ExamAttemptsService } from './exam-attempts.service.js';

const attemptId = '64b64c4f2f1c2a3b4c5d7011';
const examId = '64b64c4f2f1c2a3b4c5d7012';
const versionId = '64b64c4f2f1c2a3b4c5d7013';
const studentId = '64b64c4f2f1c2a3b4c5d7014';
const otherStudentId = '64b64c4f2f1c2a3b4c5d7015';
const userId = '64b64c4f2f1c2a3b4c5d7016';
const olympiadId = '64b64c4f2f1c2a3b4c5d7017';
const otherOlympiadId = '64b64c4f2f1c2a3b4c5d7018';
const registrationId = '64b64c4f2f1c2a3b4c5d7019';
const questionA = '64b64c4f2f1c2a3b4c5d7021';
const questionB = '64b64c4f2f1c2a3b4c5d7022';
const questionC = '64b64c4f2f1c2a3b4c5d7023';
const qvA = '64b64c4f2f1c2a3b4c5d7024';
const qvB = '64b64c4f2f1c2a3b4c5d7025';
const qvC = '64b64c4f2f1c2a3b4c5d7026';

function idRef(value: string) {
  return { toString: () => value };
}

function createExam(overrides: Record<string, unknown> = {}) {
  return {
    id: examId,
    _id: idRef(examId),
    olympiadId: idRef(olympiadId),
    status: ExamStatus.ONGOING,
    startsAt: new Date(Date.now() - 60 * 60_000),
    endsAt: new Date(Date.now() + 2 * 60 * 60_000),
    ...overrides,
  };
}

function createVersion(overrides: Record<string, unknown> = {}) {
  return {
    id: versionId,
    _id: idRef(versionId),
    examId: idRef(examId),
    version: 1,
    title: 'Official paper',
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

function createRegistration(overrides: Record<string, unknown> = {}) {
  return {
    id: registrationId,
    _id: idRef(registrationId),
    studentId: idRef(studentId),
    olympiadId: idRef(olympiadId),
    status: OlympiadRegistrationStatus.CONFIRMED,
    ...overrides,
  };
}

function createAttemptDoc(overrides: Record<string, unknown> = {}) {
  return {
    id: attemptId,
    _id: idRef(attemptId),
    studentId: idRef(studentId),
    examId: idRef(examId),
    examVersionId: idRef(versionId),
    registrationId: idRef(registrationId),
    status: ExamAttemptStatus.NOT_STARTED,
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

describe('ExamAttemptsService', () => {
  const attemptModel = {
    create: vi.fn(),
    findById: vi.fn(),
    findOne: vi.fn(),
    find: vi.fn(),
    findOneAndUpdate: vi.fn(),
    countDocuments: vi.fn(),
  };
  const examModel = {
    findById: vi.fn(),
  };
  const examVersionModel = {
    findOne: vi.fn(),
    findById: vi.fn(),
  };
  const registrationModel = {
    findOne: vi.fn(),
  };
  const questionVersionModel = {
    find: vi.fn(),
  };
  const studentsService = {
    findByUserId: vi.fn(),
  };
  const olympiadsService = {
    findById: vi.fn(),
  };

  let service: ExamAttemptsService;

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

  function mockEligibleExam() {
    examModel.findById.mockReturnValue({
      exec: vi.fn().mockResolvedValue(createExam()),
    });
    examVersionModel.findOne.mockReturnValue({
      sort: vi.fn().mockReturnThis(),
      exec: vi.fn().mockResolvedValue(createVersion()),
    });
    examVersionModel.findById.mockReturnValue({
      exec: vi.fn().mockResolvedValue(createVersion()),
    });
    olympiadsService.findById.mockResolvedValue({
      id: olympiadId,
      _id: idRef(olympiadId),
    });
    registrationModel.findOne.mockReturnValue({
      exec: vi.fn().mockResolvedValue(createRegistration()),
    });
    attemptModel.findOne.mockReturnValue({
      exec: vi.fn().mockResolvedValue(null),
    });
  }

  function mockQuestionVersions(includeOpenEnded = false) {
    questionVersionModel.find.mockReturnValue({
      exec: vi.fn().mockResolvedValue(createQuestionVersions(includeOpenEnded)),
    });
  }

  beforeEach(() => {
    vi.clearAllMocks();
    studentsService.findByUserId.mockResolvedValue({ _id: idRef(studentId) });
    service = new ExamAttemptsService(
      attemptModel as never,
      examModel as never,
      examVersionModel as never,
      registrationModel as never,
      questionVersionModel as never,
      studentsService as never,
      olympiadsService as never,
    );
  });

  describe('access and eligibility', () => {
    it('rejects non-student create', async () => {
      await expect(service.create(admin, examId)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });

    it('rejects missing StudentProfile', async () => {
      studentsService.findByUserId.mockRejectedValue(
        new NotFoundException('Student profile not found'),
      );
      await expect(service.create(student, examId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('rejects a missing exam', async () => {
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null),
      });
      await expect(service.create(student, examId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('rejects an exam without an ExamVersion', async () => {
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExam()),
      });
      examVersionModel.findOne.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(null),
      });

      await expect(service.create(student, examId)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });

    it('rejects an unconfirmed registration', async () => {
      mockEligibleExam();
      registrationModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createRegistration({ status: OlympiadRegistrationStatus.PENDING }),
        ),
      });

      await expect(service.create(student, examId)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });

    it('rejects a missing registration', async () => {
      mockEligibleExam();
      registrationModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null),
      });

      await expect(service.create(student, examId)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });

    it('rejects a registration that belongs to another student', async () => {
      mockEligibleExam();
      registrationModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createRegistration({ studentId: idRef(otherStudentId) }),
        ),
      });

      await expect(service.create(student, examId)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });

    it('rejects a registration whose olympiad does not match the exam', async () => {
      mockEligibleExam();
      registrationModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createRegistration({ olympiadId: idRef(otherOlympiadId) }),
        ),
      });

      await expect(service.create(student, examId)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });

    it('rejects attempts outside the exam window', async () => {
      mockEligibleExam();
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createExam({
            startsAt: new Date(Date.now() - 3 * 60 * 60_000),
            endsAt: new Date(Date.now() - 60_000),
          }),
        ),
      });

      await expect(service.create(student, examId)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });

  describe('create', () => {
    it('creates an official attempt for a confirmed student', async () => {
      mockEligibleExam();
      attemptModel.create.mockResolvedValue(createAttemptDoc());

      const result = await service.create(student, examId);

      expect(result.status).toBe(ExamAttemptStatus.NOT_STARTED);
      expect(result.examVersionId).toBe(versionId);
      expect(result.registrationId).toBe(registrationId);
      expect(attemptModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          status: ExamAttemptStatus.NOT_STARTED,
          totalMarks: 5,
        }),
      );
    });

    it('rejects a duplicate official attempt', async () => {
      mockEligibleExam();
      attemptModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createAttemptDoc()),
      });

      await expect(service.create(student, examId)).rejects.toBeInstanceOf(
        ConflictException,
      );
      expect(attemptModel.create).not.toHaveBeenCalled();
    });

    it('uses the unique index as the concurrent duplicate guard', async () => {
      mockEligibleExam();
      attemptModel.create.mockRejectedValue({ code: 11000 });

      await expect(service.create(student, examId)).rejects.toBeInstanceOf(
        ConflictException,
      );
    });
  });

  describe('start and ownership', () => {
    it('starts a NOT_STARTED attempt', async () => {
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createAttemptDoc()),
      });
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExam()),
      });
      examVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion()),
      });
      const started = createAttemptDoc({
        status: ExamAttemptStatus.IN_PROGRESS,
        startedAt: new Date(),
      });
      attemptModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(started),
      });

      const result = await service.start(student, attemptId);
      expect(result.status).toBe(ExamAttemptStatus.IN_PROGRESS);
      expect(attemptModel.findOneAndUpdate).toHaveBeenCalledWith(
        expect.objectContaining({ status: ExamAttemptStatus.NOT_STARTED }),
        expect.objectContaining({
          $set: expect.objectContaining({
            status: ExamAttemptStatus.IN_PROGRESS,
          }),
        }),
        { new: true },
      );
    });

    it('rejects starting twice', async () => {
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({ status: ExamAttemptStatus.IN_PROGRESS }),
        ),
      });
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExam()),
      });
      examVersionModel.findById.mockReturnValue({
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
            status: ExamAttemptStatus.IN_PROGRESS,
            startedAt: new Date(),
          }),
        ),
      });
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExam()),
      });
      examVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion()),
      });
      mockQuestionVersions();
    }

    it('saves an MCQ answer', async () => {
      mockInProgress();
      attemptModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: ExamAttemptStatus.IN_PROGRESS,
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

      const result = await service.saveAnswers(student, attemptId, {
        answers: [{ questionId: questionA, selectedOptionIds: ['a1'] }],
      });
      expect(result.answers[0]?.selectedOptionIds).toEqual(['a1']);
      expect(result.answers[0]).not.toHaveProperty('isCorrect');
    });

    it('saves a MULTIPLE_SELECT answer', async () => {
      mockInProgress();
      attemptModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: ExamAttemptStatus.IN_PROGRESS,
            answers: [
              {
                questionId: idRef(questionB),
                selectedOptionIds: ['b1', 'b2'],
                marksAwarded: 0,
              },
            ],
          }),
        ),
      });

      const result = await service.saveAnswers(student, attemptId, {
        answers: [{ questionId: questionB, selectedOptionIds: ['b1', 'b2'] }],
      });
      expect(result.answers[0]?.selectedOptionIds).toEqual(['b1', 'b2']);
    });

    it('saves an OPEN_ENDED answer', async () => {
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
            status: ExamAttemptStatus.IN_PROGRESS,
            startedAt: new Date(),
            totalMarks: 4,
          }),
        ),
      });
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExam()),
      });
      examVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(version),
      });
      questionVersionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createQuestionVersions(true).slice(-1)),
      });
      attemptModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: ExamAttemptStatus.IN_PROGRESS,
            answers: [
              {
                questionId: idRef(questionC),
                responseText: 'My reasoning',
                marksAwarded: 0,
              },
            ],
          }),
        ),
      });

      const result = await service.saveAnswers(student, attemptId, {
        answers: [{ questionId: questionC, responseText: 'My reasoning' }],
      });
      expect(result.answers[0]?.responseText).toBe('My reasoning');
    });

    it('rejects answers for questions outside the exam version', async () => {
      mockInProgress();
      await expect(
        service.saveAnswers(student, attemptId, {
          answers: [
            {
              questionId: '64b64c4f2f1c2a3b4c5d7099',
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
          createAttemptDoc({ status: ExamAttemptStatus.SUBMITTED }),
        ),
      });
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExam()),
      });
      examVersionModel.findById.mockReturnValue({
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
    it('scores objective questions and auto-evaluates', async () => {
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: ExamAttemptStatus.IN_PROGRESS,
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
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExam()),
      });
      examVersionModel.findById.mockReturnValue({
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
      expect(result.status).toBe(ExamAttemptStatus.EVALUATED);
      expect(result.totalScore).toBe(5);
      expect(result.sectionScores?.[0]).toMatchObject({
        cognitiveDomain: CognitiveDomain.THINK,
        score: 5,
        maxScore: 5,
      });
    });

    it('keeps OPEN_ENDED exams SUBMITTED without inventing a score', async () => {
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
            status: ExamAttemptStatus.IN_PROGRESS,
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
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExam()),
      });
      examVersionModel.findById.mockReturnValue({
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
      expect(result.status).toBe(ExamAttemptStatus.SUBMITTED);
      expect(result.totalScore).toBe(0);
      expect(result.answers[0]?.isCorrect).toBeUndefined();
    });

    it('rejects a concurrent submit once the attempt is no longer IN_PROGRESS', async () => {
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: ExamAttemptStatus.IN_PROGRESS,
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
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExam()),
      });
      examVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion()),
      });
      mockQuestionVersions();
      attemptModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null),
      });

      await expect(service.submit(student, attemptId)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });

  describe('expiry, list, and detail', () => {
    it('expires in-progress attempts after ExamVersion duration', async () => {
      const startedAt = new Date(Date.now() - 31 * 60_000);
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: ExamAttemptStatus.IN_PROGRESS,
            startedAt,
          }),
        ),
      });
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExam()),
      });
      examVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion()),
      });
      attemptModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: ExamAttemptStatus.EXPIRED,
            startedAt,
          }),
        ),
      });

      await expect(service.submit(student, attemptId)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(attemptModel.findOneAndUpdate).toHaveBeenCalledWith(
        expect.objectContaining({ status: ExamAttemptStatus.IN_PROGRESS }),
        { $set: { status: ExamAttemptStatus.EXPIRED } },
        { new: true },
      );
    });

    it('expires in-progress attempts at the exam window end', async () => {
      const startedAt = new Date(Date.now() - 60_000);
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: ExamAttemptStatus.IN_PROGRESS,
            startedAt,
          }),
        ),
      });
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createExam({
            endsAt: new Date(Date.now() - 1000),
          }),
        ),
      });
      examVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion({ durationMinutes: 90 })),
      });
      attemptModel.findOneAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: ExamAttemptStatus.EXPIRED,
            startedAt,
          }),
        ),
      });

      await expect(service.submit(student, attemptId)).rejects.toBeInstanceOf(
        BadRequestException,
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
      examVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createVersion()),
      });

      const result = await service.listMine(student, {
        page: 2,
        limit: 5,
        status: ExamAttemptStatus.NOT_STARTED,
        examId,
      });

      expect(result.total).toBe(1);
      expect(skip).toHaveBeenCalledWith(5);
      expect(limit).toHaveBeenCalledWith(5);
      expect(attemptModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          status: ExamAttemptStatus.NOT_STARTED,
          examId,
        }),
      );
    });

    it('returns attempt detail without leaking answer keys before evaluation', async () => {
      attemptModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createAttemptDoc({
            status: ExamAttemptStatus.IN_PROGRESS,
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
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExam()),
      });
      examVersionModel.findById.mockReturnValue({
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
