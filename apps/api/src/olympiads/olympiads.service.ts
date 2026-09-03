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
import {
  OlympiadStatus,
} from '../common/enums/olympiad-status.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { StudentsService } from '../students/students.service.js';
import type {
  CreateOlympiadDto,
  ListOlympiadsQueryDto,
  UpdateOlympiadDto,
  UpdateOlympiadStatusDto,
} from './dto/olympiads.dto.js';
import { Olympiad, type OlympiadDocument } from './schemas/olympiad.schema.js';

type OlympiadFilter = Record<string, unknown>;

const STUDENT_VISIBLE_STATUSES: OlympiadStatus[] = [
  OlympiadStatus.PUBLISHED,
  OlympiadStatus.REGISTRATION_OPEN,
  OlympiadStatus.REGISTRATION_CLOSED,
  OlympiadStatus.ONGOING,
  OlympiadStatus.COMPLETED,
];

const SCHOOL_VISIBLE_STATUSES: OlympiadStatus[] = [
  ...STUDENT_VISIBLE_STATUSES,
  OlympiadStatus.ARCHIVED,
];

const ALLOWED_STATUS_TRANSITIONS: Record<OlympiadStatus, OlympiadStatus[]> = {
  [OlympiadStatus.DRAFT]: [OlympiadStatus.PUBLISHED, OlympiadStatus.ARCHIVED],
  [OlympiadStatus.PUBLISHED]: [
    OlympiadStatus.DRAFT,
    OlympiadStatus.REGISTRATION_OPEN,
    OlympiadStatus.ARCHIVED,
  ],
  [OlympiadStatus.REGISTRATION_OPEN]: [
    OlympiadStatus.PUBLISHED,
    OlympiadStatus.REGISTRATION_CLOSED,
    OlympiadStatus.ONGOING,
    OlympiadStatus.ARCHIVED,
  ],
  [OlympiadStatus.REGISTRATION_CLOSED]: [
    OlympiadStatus.REGISTRATION_OPEN,
    OlympiadStatus.ONGOING,
    OlympiadStatus.ARCHIVED,
  ],
  [OlympiadStatus.ONGOING]: [
    OlympiadStatus.COMPLETED,
    OlympiadStatus.ARCHIVED,
  ],
  [OlympiadStatus.COMPLETED]: [OlympiadStatus.ARCHIVED],
  [OlympiadStatus.ARCHIVED]: [OlympiadStatus.DRAFT],
};

@Injectable()
export class OlympiadsService {
  constructor(
    @InjectModel(Olympiad.name)
    private readonly olympiadModel: Model<OlympiadDocument>,
    private readonly studentsService: StudentsService,
  ) {}

  async createForUser(
    user: AuthUser,
    dto: CreateOlympiadDto,
  ): Promise<OlympiadDocument> {
    this.assertSuperAdmin(user);
    this.assertValidRegistrationWindow(
      new Date(dto.registrationStartsAt),
      new Date(dto.registrationEndsAt),
    );

    const code = dto.code.trim().toUpperCase();
    const slug = dto.slug.trim().toLowerCase();
    const academicYear = dto.academicYear.trim();

    await this.assertUniqueFields({ code, slug, academicYear });

    try {
      return await this.olympiadModel.create({
        name: dto.name.trim(),
        code,
        slug,
        description: dto.description?.trim(),
        academicYear,
        eligibleClasses: dto.eligibleClasses,
        registrationStartsAt: new Date(dto.registrationStartsAt),
        registrationEndsAt: new Date(dto.registrationEndsAt),
        status: OlympiadStatus.DRAFT,
      });
    } catch (error) {
      this.rethrowDuplicateConflict(error);
      throw error;
    }
  }

  async listForUser(
    user: AuthUser,
    query: ListOlympiadsQueryDto,
  ): Promise<PaginatedResult<OlympiadDocument>> {
    const filter = await this.buildListFilter(user, query);
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const [items, total] = await Promise.all([
      this.olympiadModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.olympiadModel.countDocuments(filter).exec(),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async getByIdForUser(
    user: AuthUser,
    olympiadId: string,
  ): Promise<OlympiadDocument> {
    const olympiad = await this.findById(olympiadId);
    await this.assertCanViewOlympiad(user, olympiad);
    return olympiad;
  }

  async updateForUser(
    user: AuthUser,
    olympiadId: string,
    dto: UpdateOlympiadDto,
  ): Promise<OlympiadDocument> {
    this.assertSuperAdmin(user);

    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    const olympiad = await this.findById(olympiadId);

    if (
      olympiad.status === OlympiadStatus.COMPLETED ||
      olympiad.status === OlympiadStatus.ARCHIVED
    ) {
      throw new BadRequestException(
        'Completed or archived olympiads cannot be edited',
      );
    }

    const nextStartsAt = dto.registrationStartsAt
      ? new Date(dto.registrationStartsAt)
      : olympiad.registrationStartsAt;
    const nextEndsAt = dto.registrationEndsAt
      ? new Date(dto.registrationEndsAt)
      : olympiad.registrationEndsAt;
    this.assertValidRegistrationWindow(nextStartsAt, nextEndsAt);

    if (dto.code !== undefined) {
      const code = dto.code.trim().toUpperCase();
      await this.assertUniqueFields({ code, excludeId: olympiad.id });
      olympiad.code = code;
    }
    if (dto.slug !== undefined) {
      const slug = dto.slug.trim().toLowerCase();
      await this.assertUniqueFields({ slug, excludeId: olympiad.id });
      olympiad.slug = slug;
    }
    if (dto.academicYear !== undefined) {
      const academicYear = dto.academicYear.trim();
      await this.assertUniqueFields({ academicYear, excludeId: olympiad.id });
      olympiad.academicYear = academicYear;
    }
    if (dto.name !== undefined) {
      olympiad.name = dto.name.trim();
    }
    if (dto.description !== undefined) {
      olympiad.description = dto.description.trim();
    }
    if (dto.eligibleClasses !== undefined) {
      olympiad.eligibleClasses = dto.eligibleClasses;
    }
    if (dto.registrationStartsAt !== undefined) {
      olympiad.registrationStartsAt = nextStartsAt;
    }
    if (dto.registrationEndsAt !== undefined) {
      olympiad.registrationEndsAt = nextEndsAt;
    }

    try {
      await olympiad.save();
    } catch (error) {
      this.rethrowDuplicateConflict(error);
      throw error;
    }

    return olympiad;
  }

  async updateStatusForUser(
    user: AuthUser,
    olympiadId: string,
    dto: UpdateOlympiadStatusDto,
  ): Promise<OlympiadDocument> {
    this.assertSuperAdmin(user);

    const olympiad = await this.findById(olympiadId);
    if (olympiad.status === dto.status) {
      return olympiad;
    }

    const allowed = ALLOWED_STATUS_TRANSITIONS[olympiad.status] ?? [];
    if (!allowed.includes(dto.status)) {
      throw new BadRequestException(
        `Cannot transition olympiad status from ${olympiad.status} to ${dto.status}`,
      );
    }

    olympiad.status = dto.status;
    await olympiad.save();
    return olympiad;
  }

  async findById(id: string): Promise<OlympiadDocument> {
    this.assertObjectId(id);
    const olympiad = await this.olympiadModel.findById(id).exec();
    if (!olympiad) {
      throw new NotFoundException('Olympiad not found');
    }
    return olympiad;
  }

  private async buildListFilter(
    user: AuthUser,
    query: ListOlympiadsQueryDto,
  ): Promise<OlympiadFilter> {
    const filter: OlympiadFilter = {};

    if (this.hasRole(user, UserRole.SUPER_ADMIN)) {
      // no default status restriction
    } else if (this.hasRole(user, UserRole.SCHOOL_ADMIN)) {
      filter.status = { $in: SCHOOL_VISIBLE_STATUSES };
    } else if (this.hasRole(user, UserRole.STUDENT)) {
      filter.status = { $in: STUDENT_VISIBLE_STATUSES };
      const profile = await this.studentsService.findByUserId(user.userId);
      filter.eligibleClasses = profile.academicClass;
    } else {
      throw new ForbiddenException('Insufficient permissions');
    }

    if (query.status) {
      if (
        !this.hasRole(user, UserRole.SUPER_ADMIN) &&
        !this.isStatusVisibleToUser(user, query.status)
      ) {
        throw new ForbiddenException(
          'You cannot filter olympiads by this status',
        );
      }
      filter.status = query.status;
    }

    if (query.academicYear) {
      filter.academicYear = query.academicYear.trim();
    }

    if (query.eligibleClass) {
      if (this.hasRole(user, UserRole.STUDENT)) {
        const profile = await this.studentsService.findByUserId(user.userId);
        if (query.eligibleClass !== profile.academicClass) {
          throw new ForbiddenException(
            'Students can only view olympiads for their own class',
          );
        }
      }
      filter.eligibleClasses = query.eligibleClass;
    }

    if (query.registrationOpen === true) {
      const now = new Date();
      filter.status = OlympiadStatus.REGISTRATION_OPEN;
      filter.registrationStartsAt = { $lte: now };
      filter.registrationEndsAt = { $gte: now };
    }

    if (query.search?.trim()) {
      const pattern = new RegExp(this.escapeRegex(query.search.trim()), 'i');
      filter.$or = [
        { name: pattern },
        { code: pattern },
        { slug: pattern },
        { academicYear: pattern },
      ];
    }

    return filter;
  }

  private async assertCanViewOlympiad(
    user: AuthUser,
    olympiad: OlympiadDocument,
  ): Promise<void> {
    if (this.hasRole(user, UserRole.SUPER_ADMIN)) {
      return;
    }

    if (this.hasRole(user, UserRole.SCHOOL_ADMIN)) {
      if (!SCHOOL_VISIBLE_STATUSES.includes(olympiad.status)) {
        throw new ForbiddenException('Olympiad is not available');
      }
      return;
    }

    if (this.hasRole(user, UserRole.STUDENT)) {
      if (!STUDENT_VISIBLE_STATUSES.includes(olympiad.status)) {
        throw new ForbiddenException('Olympiad is not available');
      }
      const profile = await this.studentsService.findByUserId(user.userId);
      if (!olympiad.eligibleClasses.includes(profile.academicClass)) {
        throw new ForbiddenException(
          'This olympiad is not available for your class',
        );
      }
      return;
    }

    throw new ForbiddenException('Insufficient permissions');
  }

  private isStatusVisibleToUser(
    user: AuthUser,
    status: OlympiadStatus,
  ): boolean {
    if (this.hasRole(user, UserRole.SCHOOL_ADMIN)) {
      return SCHOOL_VISIBLE_STATUSES.includes(status);
    }
    if (this.hasRole(user, UserRole.STUDENT)) {
      return STUDENT_VISIBLE_STATUSES.includes(status);
    }
    return true;
  }

  private assertSuperAdmin(user: AuthUser): void {
    if (!this.hasRole(user, UserRole.SUPER_ADMIN)) {
      throw new ForbiddenException(
        'Only super admins can manage olympiad configuration',
      );
    }
  }

  private assertValidRegistrationWindow(startsAt: Date, endsAt: Date): void {
    if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime())) {
      throw new BadRequestException('Invalid registration date values');
    }
    if (endsAt <= startsAt) {
      throw new BadRequestException(
        'registrationEndsAt must be after registrationStartsAt',
      );
    }
  }

  private async assertUniqueFields(input: {
    code?: string;
    slug?: string;
    academicYear?: string;
    excludeId?: string;
  }): Promise<void> {
    const clauses: OlympiadFilter[] = [];
    if (input.code) {
      clauses.push({ code: input.code });
    }
    if (input.slug) {
      clauses.push({ slug: input.slug });
    }
    if (input.academicYear) {
      clauses.push({ academicYear: input.academicYear });
    }
    if (clauses.length === 0) {
      return;
    }

    const filter: OlympiadFilter = { $or: clauses };
    if (input.excludeId) {
      filter._id = { $ne: input.excludeId };
    }

    const existing = await this.olympiadModel.findOne(filter).exec();
    if (!existing) {
      return;
    }

    if (input.code && existing.code === input.code) {
      throw new ConflictException('Olympiad code is already in use');
    }
    if (input.slug && existing.slug === input.slug) {
      throw new ConflictException('Olympiad slug is already in use');
    }
    if (input.academicYear && existing.academicYear === input.academicYear) {
      throw new ConflictException(
        'An olympiad already exists for this academic year',
      );
    }
    throw new ConflictException('Olympiad unique field conflict');
  }

  private hasRole(user: AuthUser, role: UserRole): boolean {
    return user.roles.includes(role);
  }

  private assertObjectId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Olympiad not found');
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
      throw new ConflictException(
        'An olympiad with this unique value already exists',
      );
    }
  }
}
