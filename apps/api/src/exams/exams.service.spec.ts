import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import {
  CognitiveDomain,
  COGNITIVE_DOMAINS,
} from '../common/enums/cognitive-domain.enum.js';
import { ExamStatus } from '../common/enums/exam-status.enum.js';
import { QuestionStatus } from '../common/enums/question-status.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { ExamsService } from './exams.service.js';

const examId = '64b64c4f2f1c2a3b4c5d6ec1';
const olympiadId = '64b64c4f2f1c2a3b4c5d6ec2';
const versionId = '64b64c4f2f1c2a3b4c5d6ec3';
const userId = '64b64c4f2f1c2a3b4c5d6ec4';
const questionA = '64b64c4f2f1c2a3b4c5d6ed1';
const questionB = '64b64c4f2f1c2a3b4c5d6ed2';

function createOfficialBlueprint() {
  const questionDocs = [];
  const examQuestions = [];
  const sections = COGNITIVE_DOMAINS.map((domain) => ({
    cognitiveDomain: domain,
    title: domain,
    marks: 20,
    questionCount: 10,
  }));

  let order = 1;
  for (const domain of COGNITIVE_DOMAINS) {
    for (let index = 0; index < 10; index += 1) {
      const id = new Types.ObjectId().toString();
      questionDocs.push({
        id,
        _id: id,
        status: QuestionStatus.APPROVED,
        cognitiveDomain: domain,
      });
      examQuestions.push({
        questionId: id,
        marks: 2,
        order,
      });
      order += 1;
    }
  }

  return { sections, examQuestions, questionDocs };
}

function createExamDoc(overrides: Record<string, unknown> = {}) {
  return {
    id: examId,
    _id: examId,
    olympiadId,
    title: 'Official IQ Exam',
    description: 'Yearly exam',
    durationMinutes: 90,
    totalMarks: 4,
    totalQuestions: 2,
    sections: [
      {
        cognitiveDomain: CognitiveDomain.THINK,
        title: 'Think',
        marks: 4,
        questionCount: 2,
      },
    ],
    questions: [
      { questionId: questionA, marks: 2, order: 1 },
      { questionId: questionB, marks: 2, order: 2 },
    ],
    startsAt: new Date('2026-10-01T00:00:00.000Z'),
    endsAt: new Date('2026-10-01T02:00:00.000Z'),
    status: ExamStatus.DRAFT,
    save: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

describe('ExamsService', () => {
  const examModel = {
    create: vi.fn(),
    findById: vi.fn(),
    find: vi.fn(),
    countDocuments: vi.fn(),
  };
  const examVersionModel = {
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
  const olympiadsService = {
    findById: vi.fn(),
  };

  let service: ExamsService;

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

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ExamsService(
      examModel as never,
      examVersionModel as never,
      questionModel as never,
      questionVersionModel as never,
      olympiadsService as never,
    );
  });

  describe('access', () => {
    it('rejects non-admin create', async () => {
      await expect(
        service.create(student, {
          olympiadId,
          title: 'Exam',
          durationMinutes: 60,
          totalMarks: 100,
          totalQuestions: 50,
          startsAt: '2026-10-01T00:00:00.000Z',
          endsAt: '2026-10-01T02:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('create', () => {
    it('creates a draft exam', async () => {
      olympiadsService.findById.mockResolvedValue({ id: olympiadId });
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue([
          {
            id: questionA,
            status: QuestionStatus.APPROVED,
            cognitiveDomain: CognitiveDomain.THINK,
          },
          {
            id: questionB,
            status: QuestionStatus.APPROVED,
            cognitiveDomain: CognitiveDomain.THINK,
          },
        ]),
      });
      const created = createExamDoc();
      examModel.create.mockResolvedValue(created);

      const result = await service.create(superAdmin, {
        olympiadId,
        title: 'Official IQ Exam',
        durationMinutes: 90,
        totalMarks: 4,
        totalQuestions: 2,
        sections: [
          {
            cognitiveDomain: CognitiveDomain.THINK,
            title: 'Think',
            marks: 4,
            questionCount: 2,
          },
        ],
        questions: [
          { questionId: questionA, marks: 2, order: 1 },
          { questionId: questionB, marks: 2, order: 2 },
        ],
        startsAt: '2026-10-01T00:00:00.000Z',
        endsAt: '2026-10-01T02:00:00.000Z',
      });

      expect(result.status).toBe(ExamStatus.DRAFT);
    });

    it('rejects invalid olympiad', async () => {
      olympiadsService.findById.mockRejectedValue(
        new NotFoundException('Olympiad not found'),
      );

      await expect(
        service.create(superAdmin, {
          olympiadId,
          title: 'Exam',
          durationMinutes: 60,
          totalMarks: 2,
          totalQuestions: 1,
          startsAt: '2026-10-01T00:00:00.000Z',
          endsAt: '2026-10-01T02:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('rejects missing questions', async () => {
      olympiadsService.findById.mockResolvedValue({ id: olympiadId });
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue([]),
      });

      await expect(
        service.create(superAdmin, {
          olympiadId,
          title: 'Exam',
          durationMinutes: 60,
          totalMarks: 2,
          totalQuestions: 1,
          questions: [{ questionId: questionA, marks: 2, order: 1 }],
          startsAt: '2026-10-01T00:00:00.000Z',
          endsAt: '2026-10-01T02:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects non-approved questions', async () => {
      olympiadsService.findById.mockResolvedValue({ id: olympiadId });
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue([
          {
            id: questionA,
            status: QuestionStatus.DRAFT,
            cognitiveDomain: CognitiveDomain.THINK,
          },
        ]),
      });

      await expect(
        service.create(superAdmin, {
          olympiadId,
          title: 'Exam',
          durationMinutes: 60,
          totalMarks: 2,
          totalQuestions: 1,
          questions: [{ questionId: questionA, marks: 2, order: 1 }],
          startsAt: '2026-10-01T00:00:00.000Z',
          endsAt: '2026-10-01T02:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects duplicate questions', async () => {
      olympiadsService.findById.mockResolvedValue({ id: olympiadId });
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue([
          {
            id: questionA,
            status: QuestionStatus.APPROVED,
            cognitiveDomain: CognitiveDomain.THINK,
          },
        ]),
      });

      await expect(
        service.create(superAdmin, {
          olympiadId,
          title: 'Exam',
          durationMinutes: 60,
          totalMarks: 4,
          totalQuestions: 2,
          questions: [
            { questionId: questionA, marks: 2, order: 1 },
            { questionId: questionA, marks: 2, order: 2 },
          ],
          startsAt: '2026-10-01T00:00:00.000Z',
          endsAt: '2026-10-01T02:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects duplicate order values', async () => {
      olympiadsService.findById.mockResolvedValue({ id: olympiadId });
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue([
          {
            id: questionA,
            status: QuestionStatus.APPROVED,
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
        service.create(superAdmin, {
          olympiadId,
          title: 'Exam',
          durationMinutes: 60,
          totalMarks: 4,
          totalQuestions: 2,
          questions: [
            { questionId: questionA, marks: 2, order: 1 },
            { questionId: questionB, marks: 2, order: 1 },
          ],
          startsAt: '2026-10-01T00:00:00.000Z',
          endsAt: '2026-10-01T02:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects mismatched section totals', async () => {
      olympiadsService.findById.mockResolvedValue({ id: olympiadId });
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue([
          {
            id: questionA,
            status: QuestionStatus.APPROVED,
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
        service.create(superAdmin, {
          olympiadId,
          title: 'Exam',
          durationMinutes: 60,
          totalMarks: 4,
          totalQuestions: 2,
          sections: [
            {
              cognitiveDomain: CognitiveDomain.THINK,
              title: 'Think',
              marks: 20,
              questionCount: 10,
            },
          ],
          questions: [
            { questionId: questionA, marks: 2, order: 1 },
            { questionId: questionB, marks: 2, order: 2 },
          ],
          startsAt: '2026-10-01T00:00:00.000Z',
          endsAt: '2026-10-01T02:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects questions whose domain has no matching section', async () => {
      olympiadsService.findById.mockResolvedValue({ id: olympiadId });
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue([
          {
            id: questionA,
            status: QuestionStatus.APPROVED,
            cognitiveDomain: CognitiveDomain.CREATE,
          },
        ]),
      });

      await expect(
        service.create(superAdmin, {
          olympiadId,
          title: 'Exam',
          durationMinutes: 60,
          totalMarks: 2,
          totalQuestions: 1,
          sections: [
            {
              cognitiveDomain: CognitiveDomain.THINK,
              title: 'Think',
              marks: 2,
              questionCount: 1,
            },
          ],
          questions: [{ questionId: questionA, marks: 2, order: 1 }],
          startsAt: '2026-10-01T00:00:00.000Z',
          endsAt: '2026-10-01T02:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects invalid date range', async () => {
      olympiadsService.findById.mockResolvedValue({ id: olympiadId });

      await expect(
        service.create(superAdmin, {
          olympiadId,
          title: 'Exam',
          durationMinutes: 60,
          totalMarks: 100,
          totalQuestions: 50,
          startsAt: '2026-10-02T00:00:00.000Z',
          endsAt: '2026-10-01T00:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('list/get/update', () => {
    it('lists with filters and pagination', async () => {
      examModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([createExamDoc()]),
      });
      examModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(1),
      });

      const result = await service.list(superAdmin, {
        page: 1,
        limit: 10,
        olympiadId,
        status: ExamStatus.DRAFT,
        search: 'Official',
      });

      expect(result.total).toBe(1);
    });

    it('gets an exam by id', async () => {
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExamDoc()),
      });

      await expect(service.getById(superAdmin, examId)).resolves.toBeTruthy();
    });

    it('rejects invalid ObjectIds', async () => {
      await expect(service.getById(superAdmin, 'bad-id')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('updates a draft exam', async () => {
      const doc = createExamDoc();
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(doc),
      });
      olympiadsService.findById.mockResolvedValue({ id: olympiadId });
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue([
          {
            id: questionA,
            status: QuestionStatus.APPROVED,
            cognitiveDomain: CognitiveDomain.THINK,
          },
          {
            id: questionB,
            status: QuestionStatus.APPROVED,
            cognitiveDomain: CognitiveDomain.THINK,
          },
        ]),
      });

      const result = await service.update(superAdmin, examId, {
        title: 'Updated exam',
      });
      expect(result.title).toBe('Updated exam');
    });

    it('rejects published exam edits', async () => {
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createExamDoc({ status: ExamStatus.PUBLISHED }),
        ),
      });

      await expect(
        service.update(superAdmin, examId, { title: 'Nope' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects completed exam edits', async () => {
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createExamDoc({ status: ExamStatus.COMPLETED }),
        ),
      });

      await expect(
        service.update(superAdmin, examId, { title: 'Nope' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects archived exam edits', async () => {
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createExamDoc({ status: ExamStatus.ARCHIVED }),
        ),
      });

      await expect(
        service.update(superAdmin, examId, { title: 'Nope' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('lifecycle and publish', () => {
    it('publishes a valid official exam and stores QuestionVersion refs', async () => {
      const blueprint = createOfficialBlueprint();
      const doc = createExamDoc({
        totalMarks: 100,
        totalQuestions: 50,
        sections: blueprint.sections,
        questions: blueprint.examQuestions.map((item) => ({
          ...item,
          questionId: { toString: () => item.questionId },
        })),
      });
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(doc),
      });
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue(blueprint.questionDocs),
      });
      questionVersionModel.findOne.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        exec: vi.fn().mockImplementation(async () => ({
          _id: new Types.ObjectId().toString(),
          version: 1,
        })),
      });
      examVersionModel.findOne.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(null),
      });
      examVersionModel.create.mockResolvedValue({
        id: versionId,
        version: 1,
        questions: blueprint.examQuestions.map((item) => ({
          questionId: item.questionId,
          questionVersionId: 'qv1',
        })),
      });

      const result = await service.updateStatus(superAdmin, examId, {
        status: ExamStatus.PUBLISHED,
      });

      expect(result.status).toBe(ExamStatus.PUBLISHED);
      expect(examVersionModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          version: 1,
          totalMarks: 100,
          totalQuestions: 50,
        }),
      );
      const createdPayload = examVersionModel.create.mock.calls[0][0];
      expect(createdPayload.questions).toHaveLength(50);
      expect(
        createdPayload.questions.every(
          (question: { questionVersionId: string }) =>
            Boolean(question.questionVersionId),
        ),
      ).toBe(true);
    });

    it('rejects invalid official question count', async () => {
      const doc = createExamDoc({
        totalMarks: 100,
        totalQuestions: 50,
        sections: COGNITIVE_DOMAINS.map((domain) => ({
          cognitiveDomain: domain,
          title: domain,
          marks: 20,
          questionCount: 10,
        })),
        questions: [
          { questionId: { toString: () => questionA }, marks: 2, order: 1 },
        ],
      });
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(doc),
      });
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue([
          {
            id: questionA,
            status: QuestionStatus.APPROVED,
            cognitiveDomain: CognitiveDomain.THINK,
          },
        ]),
      });

      await expect(
        service.updateStatus(superAdmin, examId, {
          status: ExamStatus.PUBLISHED,
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects invalid marks on publish', async () => {
      const blueprint = createOfficialBlueprint();
      blueprint.examQuestions[0].marks = 5;
      const doc = createExamDoc({
        totalMarks: 103,
        totalQuestions: 50,
        sections: blueprint.sections,
        questions: blueprint.examQuestions.map((item) => ({
          ...item,
          questionId: { toString: () => item.questionId },
        })),
      });
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(doc),
      });
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue(blueprint.questionDocs),
      });

      await expect(
        service.updateStatus(superAdmin, examId, {
          status: ExamStatus.PUBLISHED,
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects missing cognitive domain on publish', async () => {
      const blueprint = createOfficialBlueprint();
      const sections = blueprint.sections.filter(
        (section) => section.cognitiveDomain !== CognitiveDomain.CREATE,
      );
      const doc = createExamDoc({
        totalMarks: 100,
        totalQuestions: 50,
        sections,
        questions: blueprint.examQuestions.map((item) => ({
          ...item,
          questionId: { toString: () => item.questionId },
        })),
      });
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(doc),
      });
      questionModel.find.mockReturnValue({
        exec: vi.fn().mockResolvedValue(blueprint.questionDocs),
      });

      await expect(
        service.updateStatus(superAdmin, examId, {
          status: ExamStatus.PUBLISHED,
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects invalid lifecycle transitions', async () => {
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createExamDoc({ status: ExamStatus.DRAFT }),
        ),
      });

      await expect(
        service.updateStatus(superAdmin, examId, {
          status: ExamStatus.COMPLETED,
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('versions', () => {
    it('lists exam versions', async () => {
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExamDoc()),
      });
      examVersionModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([{ id: versionId, version: 1 }]),
      });

      const result = await service.listVersions(superAdmin, examId);
      expect(result).toHaveLength(1);
    });

    it('gets an exam version by id', async () => {
      examModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createExamDoc()),
      });
      examVersionModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue({
          id: versionId,
          examId: { toString: () => examId },
        }),
      });

      await expect(
        service.getVersion(superAdmin, examId, versionId),
      ).resolves.toBeTruthy();
    });
  });
});
