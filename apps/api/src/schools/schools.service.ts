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
import { SchoolStatus } from '../common/enums/school-status.enum.js';
import { SchoolType } from '../common/enums/school-type.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { SchoolMembershipsService } from '../school-memberships/school-memberships.service.js';
import { StudentsService } from '../students/students.service.js';
import type {
  ListSchoolChildrenQueryDto,
  ListSchoolsQueryDto,
  UpdateSchoolDto,
  UpdateSchoolStatusDto,
} from './dto/schools.dto.js';
import { School, type SchoolDocument } from './schemas/school.schema.js';

type SchoolFilter = Record<string, unknown>;

export type CreateSchoolInput = {
  code?: string;
  name: string;
  branch?: string;
  email: string;
  phone?: string;
  address: {
    city: string;
    state?: string;
    line1?: string;
    line2?: string;
    pincode?: string;
    country?: string;
  };
  schoolTypes?: SchoolType[];
  managedClasses?: number[];
};

export type PublicSchoolLookup = {
  id: string;
  code: string;
  name: string;
  branch?: string;
  address: SchoolDocument['address'];
  schoolTypes: SchoolType[];
  managedClasses: number[];
  status: SchoolStatus;
};

@Injectable()
export class SchoolsService {
  constructor(
    @InjectModel(School.name)
    private readonly schoolModel: Model<SchoolDocument>,
    private readonly schoolMembershipsService: SchoolMembershipsService,
    private readonly studentsService: StudentsService,
  ) {}

  async create(input: CreateSchoolInput): Promise<SchoolDocument> {
    const code = (input.code ?? (await this.generateUniqueCode())).toUpperCase();

    const existingCode = await this.schoolModel.exists({ code });
    if (existingCode) {
      throw new ConflictException('School code is already in use');
    }

    return this.schoolModel.create({
      code,
      name: input.name.trim(),
      branch: input.branch?.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone,
      address: {
        city: input.address.city.trim(),
        state: input.address.state?.trim(),
        line1: input.address.line1?.trim(),
        line2: input.address.line2?.trim(),
        pincode: input.address.pincode,
        country: input.address.country?.trim() ?? 'India',
      },
      schoolTypes: input.schoolTypes ?? [],
      managedClasses: input.managedClasses ?? [],
      status: SchoolStatus.PENDING,
    });
  }

  async findById(id: string): Promise<SchoolDocument> {
    this.assertObjectId(id);
    const school = await this.schoolModel.findById(id).exec();
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school;
  }

  async findByCode(code: string): Promise<SchoolDocument> {
    const school = await this.schoolModel
      .findOne({ code: code.trim().toUpperCase() })
      .exec();
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school;
  }

  toPublicLookup(school: SchoolDocument): PublicSchoolLookup {
    return {
      id: school.id,
      code: school.code,
      name: school.name,
      branch: school.branch,
      address: school.address,
      schoolTypes: school.schoolTypes,
      managedClasses: school.managedClasses,
      status: school.status,
    };
  }

  async getByCodeForSignup(code: string): Promise<PublicSchoolLookup> {
    const school = await this.findByCode(code);
    return this.toPublicLookup(school);
  }

  async getByIdForUser(
    user: AuthUser,
    schoolId: string,
  ): Promise<SchoolDocument> {
    const school = await this.findById(schoolId);
    await this.assertCanViewSchool(user, school.id);
    return school;
  }

  async listForUser(
    user: AuthUser,
    query: ListSchoolsQueryDto,
  ): Promise<PaginatedResult<SchoolDocument>> {
    if (this.hasRole(user, UserRole.STUDENT) && !this.hasElevatedAccess(user)) {
      throw new ForbiddenException('Students cannot list schools');
    }

    const filter = await this.buildListFilter(user, query);
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const [items, total] = await Promise.all([
      this.schoolModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.schoolModel.countDocuments(filter).exec(),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async updateForUser(
    user: AuthUser,
    schoolId: string,
    dto: UpdateSchoolDto,
  ): Promise<SchoolDocument> {
    const school = await this.findById(schoolId);
    await this.assertCanManageSchool(user, school.id);

    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    if (dto.name !== undefined) {
      school.name = dto.name.trim();
    }
    if (dto.branch !== undefined) {
      school.branch = dto.branch.trim();
    }
    if (dto.email !== undefined) {
      school.email = dto.email.trim().toLowerCase();
    }
    if (dto.phone !== undefined) {
      school.phone = dto.phone;
    }
    if (dto.schoolTypes !== undefined) {
      school.schoolTypes = dto.schoolTypes;
    }
    if (dto.managedClasses !== undefined) {
      school.managedClasses = dto.managedClasses;
    }
    if (dto.address !== undefined) {
      school.address = {
        city: dto.address.city?.trim() ?? school.address.city,
        state:
          dto.address.state !== undefined
            ? dto.address.state.trim()
            : school.address.state,
        line1:
          dto.address.line1 !== undefined
            ? dto.address.line1.trim()
            : school.address.line1,
        line2:
          dto.address.line2 !== undefined
            ? dto.address.line2.trim()
            : school.address.line2,
        pincode:
          dto.address.pincode !== undefined
            ? dto.address.pincode
            : school.address.pincode,
        country:
          dto.address.country !== undefined
            ? dto.address.country.trim()
            : school.address.country,
      };
    }

    try {
      await school.save();
    } catch (error) {
      this.rethrowDuplicateConflict(error);
      throw error;
    }

    return school;
  }

  async updateStatusForUser(
    user: AuthUser,
    schoolId: string,
    dto: UpdateSchoolStatusDto,
  ): Promise<SchoolDocument> {
    if (!this.hasRole(user, UserRole.SUPER_ADMIN)) {
      throw new ForbiddenException(
        'Only super admins can change school status',
      );
    }

    const school = await this.findById(schoolId);
    school.status = dto.status;
    await school.save();
    return school;
  }

  async listMembersForUser(
    user: AuthUser,
    schoolId: string,
    query: ListSchoolChildrenQueryDto,
  ) {
    await this.findById(schoolId);
    await this.assertCanManageSchool(user, schoolId);

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { items, total } = await this.schoolMembershipsService.listBySchoolId(
      schoolId,
      page,
      limit,
    );

    return buildPaginatedResult(items, total, page, limit);
  }

  async listStudentsForUser(
    user: AuthUser,
    schoolId: string,
    query: ListSchoolChildrenQueryDto,
  ) {
    await this.findById(schoolId);
    await this.assertCanManageSchool(user, schoolId);

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const { items, total } = await this.studentsService.listBySchoolId(
      schoolId,
      page,
      limit,
    );

    return buildPaginatedResult(items, total, page, limit);
  }

  async deleteById(schoolId: string): Promise<void> {
    await this.schoolModel.deleteOne({ _id: schoolId }).exec();
  }

  private async buildListFilter(
    user: AuthUser,
    query: ListSchoolsQueryDto,
  ): Promise<SchoolFilter> {
    const filter: SchoolFilter = {};

    if (this.hasRole(user, UserRole.SUPER_ADMIN)) {
      // no ownership restriction
    } else if (this.hasRole(user, UserRole.SCHOOL_ADMIN)) {
      const memberships =
        await this.schoolMembershipsService.findActiveByUser(user.userId);
      const schoolIds = memberships.map((membership) => membership.schoolId);
      filter._id = { $in: schoolIds };
    } else {
      throw new ForbiddenException('Insufficient permissions');
    }

    if (query.status) {
      filter.status = query.status;
    }

    if (query.city?.trim()) {
      filter['address.city'] = new RegExp(this.escapeRegex(query.city.trim()), 'i');
    }

    if (query.state?.trim()) {
      filter['address.state'] = new RegExp(
        this.escapeRegex(query.state.trim()),
        'i',
      );
    }

    if (query.search?.trim()) {
      const pattern = new RegExp(this.escapeRegex(query.search.trim()), 'i');
      filter.$or = [
        { name: pattern },
        { code: pattern },
        { email: pattern },
        { branch: pattern },
      ];
    }

    return filter;
  }

  private async assertCanViewSchool(
    user: AuthUser,
    schoolId: string,
  ): Promise<void> {
    if (this.hasRole(user, UserRole.SUPER_ADMIN)) {
      return;
    }

    if (this.hasRole(user, UserRole.SCHOOL_ADMIN)) {
      await this.schoolMembershipsService.assertActiveMembership(
        user.userId,
        schoolId,
      );
      return;
    }

    if (this.hasRole(user, UserRole.STUDENT)) {
      const profile = await this.studentsService.findByUserId(user.userId);
      if (profile.schoolId.toString() !== schoolId) {
        throw new ForbiddenException('You do not have access to this school');
      }
      return;
    }

    throw new ForbiddenException('Insufficient permissions');
  }

  private async assertCanManageSchool(
    user: AuthUser,
    schoolId: string,
  ): Promise<void> {
    if (this.hasRole(user, UserRole.SUPER_ADMIN)) {
      return;
    }

    if (this.hasRole(user, UserRole.SCHOOL_ADMIN)) {
      await this.schoolMembershipsService.assertActiveMembership(
        user.userId,
        schoolId,
      );
      return;
    }

    throw new ForbiddenException('Insufficient permissions');
  }

  private hasElevatedAccess(user: AuthUser): boolean {
    return (
      this.hasRole(user, UserRole.SUPER_ADMIN) ||
      this.hasRole(user, UserRole.SCHOOL_ADMIN)
    );
  }

  private hasRole(user: AuthUser, role: UserRole): boolean {
    return user.roles.includes(role);
  }

  private assertObjectId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('School not found');
    }
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private rethrowDuplicateConflict(error: unknown): void {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: number }).code === 11000
    ) {
      throw new ConflictException('A school with this unique value already exists');
    }
  }

  private async generateUniqueCode(): Promise<string> {
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
      const code = `SCH-${suffix}`;
      const exists = await this.schoolModel.exists({ code });
      if (!exists) {
        return code;
      }
    }
    throw new ConflictException('Unable to generate a unique school code');
  }
}
