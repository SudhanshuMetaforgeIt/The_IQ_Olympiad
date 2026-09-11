import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { OlympiadStatus } from '../common/enums/olympiad-status.enum.js';
import { StudentClass } from '../common/enums/student-class.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { OlympiadsService } from './olympiads.service.js';

const olympiadId = '64b64c4f2f1c2a3b4c5d6e90';
const userId = '64b64c4f2f1c2a3b4c5d6e91';

function createOlympiadDoc(overrides: Record<string, unknown> = {}) {
  return {
    id: olympiadId,
    _id: olympiadId,
    name: 'IQ Olympiad 2026',
    code: 'IQO-2026',
    slug: 'iq-olympiad-2026',
    description: 'Annual olympiad',
    academicYear: '2026-27',
    eligibleClasses: [StudentClass.CLASS_7, StudentClass.CLASS_8],
    registrationStartsAt: new Date('2026-01-01T00:00:00.000Z'),
    registrationEndsAt: new Date('2026-03-01T00:00:00.000Z'),
    status: OlympiadStatus.DRAFT,
    save: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

describe('OlympiadsService', () => {
  const olympiadModel = {
    create: vi.fn(),
    findById: vi.fn(),
    findOne: vi.fn(),
    find: vi.fn(),
    countDocuments: vi.fn(),
  };

  const studentsService = {
    findByUserId: vi.fn(),
  };

  let service: OlympiadsService;

  const superAdmin: AuthUser = {
    userId,
    email: 'admin@example.com',
    roles: [UserRole.SUPER_ADMIN],
  };

  const schoolAdmin: AuthUser = {
    userId,
    email: 'school@example.com',
    roles: [UserRole.SCHOOL_ADMIN],
  };

  const student: AuthUser = {
    userId,
    email: 'student@example.com',
    roles: [UserRole.STUDENT],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    service = new OlympiadsService(
      olympiadModel as never,
      studentsService as never,
    );
  });

  describe('createForUser', () => {
    it('allows SUPER_ADMIN to create a draft olympiad', async () => {
      olympiadModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null),
      });
      const created = createOlympiadDoc();
      olympiadModel.create.mockResolvedValue(created);

      const result = await service.createForUser(superAdmin, {
        name: 'IQ Olympiad 2026',
        code: 'IQO-2026',
        slug: 'iq-olympiad-2026',
        academicYear: '2026-27',
        eligibleClasses: [StudentClass.CLASS_8],
        registrationStartsAt: '2026-01-01T00:00:00.000Z',
        registrationEndsAt: '2026-03-01T00:00:00.000Z',
      });

      expect(result).toBe(created);
      expect(olympiadModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          status: OlympiadStatus.DRAFT,
          code: 'IQO-2026',
          slug: 'iq-olympiad-2026',
        }),
      );
    });

    it('rejects SCHOOL_ADMIN create', async () => {
      await expect(
        service.createForUser(schoolAdmin, {
          name: 'Nope',
          code: 'NOPE-1',
          slug: 'nope',
          academicYear: '2026-27',
          eligibleClasses: [StudentClass.CLASS_8],
          registrationStartsAt: '2026-01-01T00:00:00.000Z',
          registrationEndsAt: '2026-03-01T00:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('rejects invalid registration window', async () => {
      await expect(
        service.createForUser(superAdmin, {
          name: 'Bad Dates',
          code: 'BAD-1',
          slug: 'bad-dates',
          academicYear: '2026-27',
          eligibleClasses: [StudentClass.CLASS_8],
          registrationStartsAt: '2026-03-01T00:00:00.000Z',
          registrationEndsAt: '2026-01-01T00:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects duplicate code', async () => {
      olympiadModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createOlympiadDoc()),
      });

      await expect(
        service.createForUser(superAdmin, {
          name: 'Dup',
          code: 'IQO-2026',
          slug: 'other-slug',
          academicYear: '2027-28',
          eligibleClasses: [StudentClass.CLASS_8],
          registrationStartsAt: '2026-01-01T00:00:00.000Z',
          registrationEndsAt: '2026-03-01T00:00:00.000Z',
        }),
      ).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('listForUser', () => {
    it('lists all olympiads for SUPER_ADMIN', async () => {
      const items = [createOlympiadDoc()];
      olympiadModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(items),
      });
      olympiadModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(1),
      });

      const result = await service.listForUser(superAdmin, {
        page: 1,
        limit: 20,
        search: 'IQ',
      });

      expect(result.total).toBe(1);
      expect(result.items).toHaveLength(1);
    });

    it('hides DRAFT olympiads from SCHOOL_ADMIN', async () => {
      olympiadModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([]),
      });
      olympiadModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(0),
      });

      await service.listForUser(schoolAdmin, { page: 1, limit: 10 });

      expect(olympiadModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          status: {
            $in: expect.not.arrayContaining([OlympiadStatus.DRAFT]),
          },
        }),
      );
    });

    it('filters STUDENT list by eligible class and visible statuses', async () => {
      studentsService.findByUserId.mockResolvedValue({
        academicClass: StudentClass.CLASS_8,
      });
      olympiadModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([]),
      });
      olympiadModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(0),
      });

      await service.listForUser(student, { page: 1, limit: 10 });

      expect(olympiadModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          eligibleClasses: StudentClass.CLASS_8,
          status: {
            $in: expect.arrayContaining([
              OlympiadStatus.PUBLISHED,
              OlympiadStatus.REGISTRATION_OPEN,
            ]),
          },
        }),
      );
    });

    it('supports registrationOpen filter', async () => {
      olympiadModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([]),
      });
      olympiadModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(0),
      });

      await service.listForUser(superAdmin, {
        page: 1,
        limit: 10,
        registrationOpen: true,
      });

      expect(olympiadModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          status: OlympiadStatus.REGISTRATION_OPEN,
          registrationStartsAt: expect.objectContaining({ $lte: expect.any(Date) }),
          registrationEndsAt: expect.objectContaining({ $gte: expect.any(Date) }),
        }),
      );
    });
  });

  describe('getByIdForUser', () => {
    it('allows SUPER_ADMIN to view draft', async () => {
      olympiadModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createOlympiadDoc()),
      });

      await expect(
        service.getByIdForUser(superAdmin, olympiadId),
      ).resolves.toBeTruthy();
    });

    it('rejects STUDENT viewing draft', async () => {
      olympiadModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createOlympiadDoc()),
      });

      await expect(
        service.getByIdForUser(student, olympiadId),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('rejects STUDENT for ineligible class', async () => {
      olympiadModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createOlympiadDoc({
            status: OlympiadStatus.REGISTRATION_OPEN,
            eligibleClasses: [StudentClass.CLASS_10],
          }),
        ),
      });
      studentsService.findByUserId.mockResolvedValue({
        academicClass: StudentClass.CLASS_8,
      });

      await expect(
        service.getByIdForUser(student, olympiadId),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('allows STUDENT for eligible published olympiad', async () => {
      olympiadModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createOlympiadDoc({
            status: OlympiadStatus.PUBLISHED,
            eligibleClasses: [StudentClass.CLASS_8],
          }),
        ),
      });
      studentsService.findByUserId.mockResolvedValue({
        academicClass: StudentClass.CLASS_8,
      });

      await expect(
        service.getByIdForUser(student, olympiadId),
      ).resolves.toBeTruthy();
    });

    it('throws not found for invalid ObjectId', async () => {
      await expect(
        service.getByIdForUser(superAdmin, 'bad-id'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('updateForUser', () => {
    it('updates fields for SUPER_ADMIN', async () => {
      const doc = createOlympiadDoc();
      olympiadModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(doc),
      });
      olympiadModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null),
      });

      const result = await service.updateForUser(superAdmin, olympiadId, {
        name: 'Updated Name',
      });

      expect(result.name).toBe('Updated Name');
      expect(doc.save).toHaveBeenCalled();
    });

    it('rejects empty updates', async () => {
      olympiadModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createOlympiadDoc()),
      });

      await expect(
        service.updateForUser(superAdmin, olympiadId, {}),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects SCHOOL_ADMIN updates', async () => {
      await expect(
        service.updateForUser(schoolAdmin, olympiadId, { name: 'Nope' }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('rejects edits to completed olympiads', async () => {
      olympiadModel.findById.mockReturnValue({
        exec: vi
          .fn()
          .mockResolvedValue(
            createOlympiadDoc({ status: OlympiadStatus.COMPLETED }),
          ),
      });

      await expect(
        service.updateForUser(superAdmin, olympiadId, { name: 'Nope' }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('updateStatusForUser', () => {
    it('allows valid DRAFT -> PUBLISHED transition', async () => {
      const doc = createOlympiadDoc();
      olympiadModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(doc),
      });

      const result = await service.updateStatusForUser(superAdmin, olympiadId, {
        status: OlympiadStatus.PUBLISHED,
      });

      expect(result.status).toBe(OlympiadStatus.PUBLISHED);
    });

    it('rejects invalid COMPLETED -> DRAFT transition', async () => {
      olympiadModel.findById.mockReturnValue({
        exec: vi
          .fn()
          .mockResolvedValue(
            createOlympiadDoc({ status: OlympiadStatus.COMPLETED }),
          ),
      });

      await expect(
        service.updateStatusForUser(superAdmin, olympiadId, {
          status: OlympiadStatus.DRAFT,
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects SCHOOL_ADMIN status changes', async () => {
      await expect(
        service.updateStatusForUser(schoolAdmin, olympiadId, {
          status: OlympiadStatus.PUBLISHED,
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});
