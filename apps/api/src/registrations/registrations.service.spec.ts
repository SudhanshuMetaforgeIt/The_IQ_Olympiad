import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { OlympiadRegistrationStatus } from '../common/enums/olympiad-registration-status.enum.js';
import { OlympiadStatus } from '../common/enums/olympiad-status.enum.js';
import { StudentClass } from '../common/enums/student-class.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { RegistrationsService } from './registrations.service.js';

const olympiadId = '64b64c4f2f1c2a3b4c5d6ea1';
const registrationId = '64b64c4f2f1c2a3b4c5d6ea2';
const studentProfileId = '64b64c4f2f1c2a3b4c5d6ea3';
const otherStudentProfileId = '64b64c4f2f1c2a3b4c5d6ea4';
const userId = '64b64c4f2f1c2a3b4c5d6ea5';

function createOlympiad(overrides: Record<string, unknown> = {}) {
  return {
    id: olympiadId,
    _id: olympiadId,
    status: OlympiadStatus.REGISTRATION_OPEN,
    registrationStartsAt: new Date('2020-01-01T00:00:00.000Z'),
    registrationEndsAt: new Date('2099-01-01T00:00:00.000Z'),
    eligibleClasses: [StudentClass.CLASS_8, StudentClass.CLASS_9],
    ...overrides,
  };
}

function createStudent(overrides: Record<string, unknown> = {}) {
  return {
    id: studentProfileId,
    _id: studentProfileId,
    academicClass: StudentClass.CLASS_8,
    ...overrides,
  };
}

function createRegistration(overrides: Record<string, unknown> = {}) {
  return {
    id: registrationId,
    _id: registrationId,
    studentId: {
      toString: () => studentProfileId,
    },
    olympiadId,
    status: OlympiadRegistrationStatus.PENDING,
    registeredAt: new Date(),
    ...overrides,
  };
}

describe('RegistrationsService', () => {
  const registrationModel = {
    findOne: vi.fn(),
    create: vi.fn(),
    findById: vi.fn(),
    find: vi.fn(),
    countDocuments: vi.fn(),
    findByIdAndUpdate: vi.fn(),
  };

  const olympiadsService = {
    findById: vi.fn(),
  };

  const studentsService = {
    findByUserId: vi.fn(),
  };

  let service: RegistrationsService;

  const studentUser: AuthUser = {
    userId,
    email: 'student@example.com',
    roles: [UserRole.STUDENT],
  };

  const schoolAdmin: AuthUser = {
    userId,
    email: 'school@example.com',
    roles: [UserRole.SCHOOL_ADMIN],
  };

  const superAdmin: AuthUser = {
    userId,
    email: 'admin@example.com',
    roles: [UserRole.SUPER_ADMIN],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    service = new RegistrationsService(
      registrationModel as never,
      olympiadsService as never,
      studentsService as never,
    );
  });

  describe('createForStudent', () => {
    it('creates a pending registration for an eligible student', async () => {
      studentsService.findByUserId.mockResolvedValue(createStudent());
      olympiadsService.findById.mockResolvedValue(createOlympiad());
      registrationModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null),
      });
      const created = createRegistration();
      registrationModel.create.mockResolvedValue(created);

      const result = await service.createForStudent(studentUser, olympiadId);

      expect(result).toBe(created);
      expect(registrationModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          studentId: studentProfileId,
          olympiadId,
          status: OlympiadRegistrationStatus.PENDING,
        }),
      );
    });

    it('rejects non-student roles', async () => {
      await expect(
        service.createForStudent(schoolAdmin, olympiadId),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('rejects when olympiad is not found', async () => {
      studentsService.findByUserId.mockResolvedValue(createStudent());
      olympiadsService.findById.mockRejectedValue(
        new NotFoundException('Olympiad not found'),
      );

      await expect(
        service.createForStudent(studentUser, olympiadId),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('rejects when olympiad status is not REGISTRATION_OPEN', async () => {
      studentsService.findByUserId.mockResolvedValue(createStudent());
      olympiadsService.findById.mockResolvedValue(
        createOlympiad({ status: OlympiadStatus.PUBLISHED }),
      );

      await expect(
        service.createForStudent(studentUser, olympiadId),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects registration before opening date', async () => {
      studentsService.findByUserId.mockResolvedValue(createStudent());
      olympiadsService.findById.mockResolvedValue(
        createOlympiad({
          registrationStartsAt: new Date('2090-01-01T00:00:00.000Z'),
          registrationEndsAt: new Date('2099-01-01T00:00:00.000Z'),
        }),
      );

      await expect(
        service.createForStudent(studentUser, olympiadId),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects registration after closing date', async () => {
      studentsService.findByUserId.mockResolvedValue(createStudent());
      olympiadsService.findById.mockResolvedValue(
        createOlympiad({
          registrationStartsAt: new Date('2020-01-01T00:00:00.000Z'),
          registrationEndsAt: new Date('2020-02-01T00:00:00.000Z'),
        }),
      );

      await expect(
        service.createForStudent(studentUser, olympiadId),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects ineligible academic class', async () => {
      studentsService.findByUserId.mockResolvedValue(
        createStudent({ academicClass: StudentClass.CLASS_12 }),
      );
      olympiadsService.findById.mockResolvedValue(createOlympiad());

      await expect(
        service.createForStudent(studentUser, olympiadId),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('rejects duplicate registration', async () => {
      studentsService.findByUserId.mockResolvedValue(createStudent());
      olympiadsService.findById.mockResolvedValue(createOlympiad());
      registrationModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createRegistration()),
      });

      await expect(
        service.createForStudent(studentUser, olympiadId),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it('rejects when StudentProfile is not found', async () => {
      studentsService.findByUserId.mockRejectedValue(
        new NotFoundException('Student profile not found'),
      );

      await expect(
        service.createForStudent(studentUser, olympiadId),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('rejects invalid olympiad ObjectId', async () => {
      await expect(
        service.createForStudent(studentUser, 'bad-id'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('maps unique index conflicts to ConflictException', async () => {
      studentsService.findByUserId.mockResolvedValue(createStudent());
      olympiadsService.findById.mockResolvedValue(createOlympiad());
      registrationModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null),
      });
      registrationModel.create.mockRejectedValue({ code: 11000 });

      await expect(
        service.createForStudent(studentUser, olympiadId),
      ).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('listMine', () => {
    it('lists authenticated student registrations with pagination and status filter', async () => {
      studentsService.findByUserId.mockResolvedValue(createStudent());
      registrationModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([createRegistration()]),
      });
      registrationModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(1),
      });

      const result = await service.listMine(studentUser, {
        page: 1,
        limit: 10,
        status: OlympiadRegistrationStatus.PENDING,
      });

      expect(result.total).toBe(1);
      expect(registrationModel.find).toHaveBeenCalledWith({
        studentId: studentProfileId,
        status: OlympiadRegistrationStatus.PENDING,
      });
    });

    it('rejects non-student listing', async () => {
      await expect(
        service.listMine(superAdmin, { page: 1, limit: 10 }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('getByIdForUser', () => {
    it('allows student to view own registration', async () => {
      registrationModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createRegistration()),
      });
      studentsService.findByUserId.mockResolvedValue(createStudent());

      await expect(
        service.getByIdForUser(studentUser, registrationId),
      ).resolves.toBeTruthy();
    });

    it('rejects student viewing another registration', async () => {
      registrationModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createRegistration({
            studentId: { toString: () => otherStudentProfileId },
          }),
        ),
      });
      studentsService.findByUserId.mockResolvedValue(createStudent());

      await expect(
        service.getByIdForUser(studentUser, registrationId),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('allows SUPER_ADMIN to view any registration', async () => {
      registrationModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createRegistration()),
      });

      await expect(
        service.getByIdForUser(superAdmin, registrationId),
      ).resolves.toBeTruthy();
    });

    it('rejects invalid registration ObjectId', async () => {
      await expect(
        service.getByIdForUser(superAdmin, 'bad-id'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('listByOlympiad', () => {
    it('lists olympiad registrations for SUPER_ADMIN', async () => {
      olympiadsService.findById.mockResolvedValue(createOlympiad());
      registrationModel.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([createRegistration()]),
      });
      registrationModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(1),
      });

      const result = await service.listByOlympiad(superAdmin, olympiadId, {
        page: 1,
        limit: 20,
        status: OlympiadRegistrationStatus.PENDING,
      });

      expect(result.total).toBe(1);
    });

    it('rejects SCHOOL_ADMIN listing by olympiad', async () => {
      await expect(
        service.listByOlympiad(schoolAdmin, olympiadId, { page: 1, limit: 20 }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('updateStatusForAdmin', () => {
    it('allows PENDING to CONFIRMED', async () => {
      registrationModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createRegistration()),
      });
      registrationModel.findByIdAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createRegistration({
            status: OlympiadRegistrationStatus.CONFIRMED,
            confirmedAt: new Date(),
          }),
        ),
      });

      const result = await service.updateStatusForAdmin(
        superAdmin,
        registrationId,
        { status: OlympiadRegistrationStatus.CONFIRMED },
      );

      expect(result.status).toBe(OlympiadRegistrationStatus.CONFIRMED);
      expect(registrationModel.findByIdAndUpdate).toHaveBeenCalledWith(
        registrationId,
        expect.objectContaining({
          $set: expect.objectContaining({
            status: OlympiadRegistrationStatus.CONFIRMED,
          }),
          $unset: expect.objectContaining({
            cancelledAt: 1,
            rejectionReason: 1,
          }),
        }),
        { new: true },
      );
    });

    it('allows PENDING to REJECTED with reason', async () => {
      registrationModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createRegistration()),
      });
      registrationModel.findByIdAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createRegistration({
            status: OlympiadRegistrationStatus.REJECTED,
            rejectionReason: 'Incomplete profile',
          }),
        ),
      });

      const result = await service.updateStatusForAdmin(
        superAdmin,
        registrationId,
        {
          status: OlympiadRegistrationStatus.REJECTED,
          rejectionReason: 'Incomplete profile',
        },
      );

      expect(result.status).toBe(OlympiadRegistrationStatus.REJECTED);
    });

    it('requires rejectionReason for REJECTED', async () => {
      registrationModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createRegistration()),
      });

      await expect(
        service.updateStatusForAdmin(superAdmin, registrationId, {
          status: OlympiadRegistrationStatus.REJECTED,
          rejectionReason: '   ',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects invalid transitions from CONFIRMED', async () => {
      registrationModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createRegistration({
            status: OlympiadRegistrationStatus.CONFIRMED,
          }),
        ),
      });

      await expect(
        service.updateStatusForAdmin(superAdmin, registrationId, {
          status: OlympiadRegistrationStatus.REJECTED,
          rejectionReason: 'Too late',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects student status updates', async () => {
      await expect(
        service.updateStatusForAdmin(studentUser, registrationId, {
          status: OlympiadRegistrationStatus.CONFIRMED,
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('cancelForStudent', () => {
    it('allows student to cancel own pending registration', async () => {
      registrationModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createRegistration()),
      });
      studentsService.findByUserId.mockResolvedValue(createStudent());
      registrationModel.findByIdAndUpdate.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createRegistration({
            status: OlympiadRegistrationStatus.CANCELLED,
            cancelledAt: new Date(),
          }),
        ),
      });

      const result = await service.cancelForStudent(
        studentUser,
        registrationId,
      );

      expect(result.status).toBe(OlympiadRegistrationStatus.CANCELLED);
    });

    it('rejects cancelling another student registration', async () => {
      registrationModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createRegistration({
            studentId: { toString: () => otherStudentProfileId },
          }),
        ),
      });
      studentsService.findByUserId.mockResolvedValue(createStudent());

      await expect(
        service.cancelForStudent(studentUser, registrationId),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('rejects cancellation from REJECTED status', async () => {
      registrationModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(
          createRegistration({
            status: OlympiadRegistrationStatus.REJECTED,
          }),
        ),
      });
      studentsService.findByUserId.mockResolvedValue(createStudent());

      await expect(
        service.cancelForStudent(studentUser, registrationId),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});
