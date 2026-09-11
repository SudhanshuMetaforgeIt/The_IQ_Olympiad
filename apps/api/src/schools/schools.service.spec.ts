import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { SchoolStatus } from '../common/enums/school-status.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { SchoolsService } from './schools.service.js';

const schoolId = '64b64c4f2f1c2a3b4c5d6e7f';
const otherSchoolId = '64b64c4f2f1c2a3b4c5d6e80';
const userId = '64b64c4f2f1c2a3b4c5d6e81';

function createSchoolDoc(overrides: Record<string, unknown> = {}) {
  return {
    id: schoolId,
    _id: schoolId,
    code: 'SCH-ABC123',
    name: 'Demo School',
    branch: 'Main',
    email: 'school@example.com',
    phone: '9876543210',
    address: {
      city: 'Pune',
      state: 'MH',
      country: 'India',
    },
    schoolTypes: [],
    managedClasses: [7, 8],
    status: SchoolStatus.PENDING,
    save: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

describe('SchoolsService', () => {
  const schoolModel = {
    findById: vi.fn(),
    findOne: vi.fn(),
    find: vi.fn(),
    countDocuments: vi.fn(),
    exists: vi.fn(),
    create: vi.fn(),
    deleteOne: vi.fn(),
  };

  const schoolMembershipsService = {
    findActiveByUser: vi.fn(),
    assertActiveMembership: vi.fn(),
    listBySchoolId: vi.fn(),
  };

  const studentsService = {
    findByUserId: vi.fn(),
    listBySchoolId: vi.fn(),
  };

  let service: SchoolsService;

  const superAdmin: AuthUser = {
    userId,
    email: 'admin@example.com',
    roles: [UserRole.SUPER_ADMIN],
  };

  const schoolAdmin: AuthUser = {
    userId,
    email: 'schooladmin@example.com',
    roles: [UserRole.SCHOOL_ADMIN],
  };

  const student: AuthUser = {
    userId,
    email: 'student@example.com',
    roles: [UserRole.STUDENT],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    service = new SchoolsService(
      schoolModel as never,
      schoolMembershipsService as never,
      studentsService as never,
    );
  });

  describe('getByCodeForSignup', () => {
    it('returns a public lookup without contact fields', async () => {
      const school = createSchoolDoc();
      schoolModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(school),
      });

      const result = await service.getByCodeForSignup('sch-abc123');

      expect(result).toEqual({
        id: schoolId,
        code: 'SCH-ABC123',
        name: 'Demo School',
        branch: 'Main',
        address: school.address,
        schoolTypes: [],
        managedClasses: [7, 8],
        status: SchoolStatus.PENDING,
      });
      expect(result).not.toHaveProperty('email');
      expect(result).not.toHaveProperty('phone');
    });

    it('throws when school is not found', async () => {
      schoolModel.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(null),
      });

      await expect(service.getByCodeForSignup('MISSING')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('getByIdForUser', () => {
    it('allows SUPER_ADMIN to access any school', async () => {
      const school = createSchoolDoc();
      schoolModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(school),
      });

      await expect(service.getByIdForUser(superAdmin, schoolId)).resolves.toBe(
        school,
      );
    });

    it('allows SCHOOL_ADMIN for own school via membership', async () => {
      const school = createSchoolDoc();
      schoolModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(school),
      });
      schoolMembershipsService.assertActiveMembership.mockResolvedValue({});

      await expect(service.getByIdForUser(schoolAdmin, schoolId)).resolves.toBe(
        school,
      );
      expect(
        schoolMembershipsService.assertActiveMembership,
      ).toHaveBeenCalledWith(userId, schoolId);
    });

    it('rejects SCHOOL_ADMIN for another school', async () => {
      const school = createSchoolDoc({ id: otherSchoolId, _id: otherSchoolId });
      schoolModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(school),
      });
      schoolMembershipsService.assertActiveMembership.mockRejectedValue(
        new ForbiddenException('You do not have access to this school'),
      );

      await expect(
        service.getByIdForUser(schoolAdmin, otherSchoolId),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('allows STUDENT only for associated school', async () => {
      const school = createSchoolDoc();
      schoolModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(school),
      });
      studentsService.findByUserId.mockResolvedValue({
        schoolId: { toString: () => schoolId },
      });

      await expect(service.getByIdForUser(student, schoolId)).resolves.toBe(
        school,
      );
    });

    it('rejects STUDENT for unrelated school', async () => {
      const school = createSchoolDoc({ id: otherSchoolId, _id: otherSchoolId });
      schoolModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(school),
      });
      studentsService.findByUserId.mockResolvedValue({
        schoolId: { toString: () => schoolId },
      });

      await expect(
        service.getByIdForUser(student, otherSchoolId),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('throws not found for invalid id', async () => {
      await expect(
        service.getByIdForUser(superAdmin, 'not-an-id'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('listForUser', () => {
    it('lists all schools for SUPER_ADMIN with filters', async () => {
      const items = [createSchoolDoc()];
      const chain = {
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue(items),
      };
      schoolModel.find.mockReturnValue(chain);
      schoolModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(1),
      });

      const result = await service.listForUser(superAdmin, {
        page: 1,
        limit: 20,
        status: SchoolStatus.PENDING,
        city: 'Pune',
        search: 'Demo',
      });

      expect(result.total).toBe(1);
      expect(result.items).toHaveLength(1);
      expect(schoolModel.find).toHaveBeenCalled();
    });

    it('scopes SCHOOL_ADMIN list to membership schools', async () => {
      schoolMembershipsService.findActiveByUser.mockResolvedValue([
        { schoolId },
      ]);
      const chain = {
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        exec: vi.fn().mockResolvedValue([createSchoolDoc()]),
      };
      schoolModel.find.mockReturnValue(chain);
      schoolModel.countDocuments.mockReturnValue({
        exec: vi.fn().mockResolvedValue(1),
      });

      await service.listForUser(schoolAdmin, { page: 1, limit: 10 });

      expect(schoolModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: { $in: [schoolId] },
        }),
      );
    });

    it('rejects STUDENT list access', async () => {
      await expect(
        service.listForUser(student, { page: 1, limit: 10 }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('updateForUser', () => {
    it('updates safe fields for SCHOOL_ADMIN on own school', async () => {
      const school = createSchoolDoc();
      schoolModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(school),
      });
      schoolMembershipsService.assertActiveMembership.mockResolvedValue({});

      const result = await service.updateForUser(schoolAdmin, schoolId, {
        name: 'Updated School',
        address: { city: 'Mumbai' },
      });

      expect(result.name).toBe('Updated School');
      expect(result.address.city).toBe('Mumbai');
      expect(school.save).toHaveBeenCalled();
    });

    it('rejects empty update payload', async () => {
      const school = createSchoolDoc();
      schoolModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(school),
      });
      schoolMembershipsService.assertActiveMembership.mockResolvedValue({});

      await expect(
        service.updateForUser(schoolAdmin, schoolId, {}),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects SCHOOL_ADMIN update on another school', async () => {
      const school = createSchoolDoc({ id: otherSchoolId, _id: otherSchoolId });
      schoolModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(school),
      });
      schoolMembershipsService.assertActiveMembership.mockRejectedValue(
        new ForbiddenException('You do not have access to this school'),
      );

      await expect(
        service.updateForUser(schoolAdmin, otherSchoolId, { name: 'Nope' }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('rejects STUDENT updates', async () => {
      const school = createSchoolDoc();
      schoolModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(school),
      });

      await expect(
        service.updateForUser(student, schoolId, { name: 'Nope' }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('updateStatusForUser', () => {
    it('allows SUPER_ADMIN status changes', async () => {
      const school = createSchoolDoc();
      schoolModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(school),
      });

      const result = await service.updateStatusForUser(superAdmin, schoolId, {
        status: SchoolStatus.ACTIVE,
      });

      expect(result.status).toBe(SchoolStatus.ACTIVE);
      expect(school.save).toHaveBeenCalled();
    });

    it('rejects SCHOOL_ADMIN status changes', async () => {
      await expect(
        service.updateStatusForUser(schoolAdmin, schoolId, {
          status: SchoolStatus.ACTIVE,
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('listMembersForUser / listStudentsForUser', () => {
    it('lists members for authorized school admin', async () => {
      schoolModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createSchoolDoc()),
      });
      schoolMembershipsService.assertActiveMembership.mockResolvedValue({});
      schoolMembershipsService.listBySchoolId.mockResolvedValue({
        items: [{ id: 'm1' }],
        total: 1,
      });

      const result = await service.listMembersForUser(schoolAdmin, schoolId, {
        page: 1,
        limit: 20,
      });

      expect(result.total).toBe(1);
      expect(result.items).toHaveLength(1);
    });

    it('lists students for authorized school admin', async () => {
      schoolModel.findById.mockReturnValue({
        exec: vi.fn().mockResolvedValue(createSchoolDoc()),
      });
      schoolMembershipsService.assertActiveMembership.mockResolvedValue({});
      studentsService.listBySchoolId.mockResolvedValue({
        items: [{ id: 's1' }],
        total: 1,
      });

      const result = await service.listStudentsForUser(schoolAdmin, schoolId, {
        page: 1,
        limit: 20,
      });

      expect(result.total).toBe(1);
    });
  });
});
