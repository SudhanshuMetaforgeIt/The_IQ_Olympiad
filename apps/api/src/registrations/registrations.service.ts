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
import { OlympiadRegistrationStatus } from '../common/enums/olympiad-registration-status.enum.js';
import { OlympiadStatus } from '../common/enums/olympiad-status.enum.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { OlympiadsService } from '../olympiads/olympiads.service.js';
import { StudentsService } from '../students/students.service.js';
import type {
  ListRegistrationsQueryDto,
  UpdateRegistrationStatusDto,
} from './dto/registrations.dto.js';
import {
  OlympiadRegistration,
  type OlympiadRegistrationDocument,
} from './schemas/olympiad-registration.schema.js';

type RegistrationFilter = Record<string, unknown>;

const STUDENT_CANCELLABLE_STATUSES: OlympiadRegistrationStatus[] = [
  OlympiadRegistrationStatus.PENDING,
  OlympiadRegistrationStatus.CONFIRMED,
];

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectModel(OlympiadRegistration.name)
    private readonly registrationModel: Model<OlympiadRegistrationDocument>,
    private readonly olympiadsService: OlympiadsService,
    private readonly studentsService: StudentsService,
  ) {}

  async createForStudent(
    user: AuthUser,
    olympiadId: string,
  ): Promise<OlympiadRegistrationDocument> {
    this.assertStudent(user);
    this.assertObjectId(olympiadId, 'Olympiad');

    const student = await this.studentsService.findByUserId(user.userId);
    const olympiad = await this.olympiadsService.findById(olympiadId);
    const now = new Date();

    if (olympiad.status !== OlympiadStatus.REGISTRATION_OPEN) {
      throw new BadRequestException(
        'Olympiad registration is not open for this olympiad',
      );
    }

    if (now < olympiad.registrationStartsAt) {
      throw new BadRequestException('Olympiad registration has not started yet');
    }

    if (now > olympiad.registrationEndsAt) {
      throw new BadRequestException('Olympiad registration has ended');
    }

    if (
      !student.academicClass ||
      !olympiad.eligibleClasses.includes(student.academicClass)
    ) {
      throw new ForbiddenException(
        'Your academic class is not eligible for this olympiad',
      );
    }

    const existing = await this.registrationModel
      .findOne({
        studentId: student._id,
        olympiadId: olympiad._id,
      })
      .exec();
    if (existing) {
      throw new ConflictException(
        'You are already registered for this olympiad',
      );
    }

    try {
      return await this.registrationModel.create({
        studentId: student._id,
        olympiadId: olympiad._id,
        status: OlympiadRegistrationStatus.PENDING,
        registeredAt: now,
      });
    } catch (error) {
      this.rethrowDuplicateConflict(error);
      throw error;
    }
  }

  async listMine(
    user: AuthUser,
    query: ListRegistrationsQueryDto,
  ): Promise<PaginatedResult<OlympiadRegistrationDocument>> {
    this.assertStudent(user);
    const student = await this.studentsService.findByUserId(user.userId);

    const filter: RegistrationFilter = { studentId: student._id };
    if (query.status) {
      filter.status = query.status;
    }

    return this.paginate(filter, query.page ?? 1, query.limit ?? 20);
  }

  async getByIdForUser(
    user: AuthUser,
    registrationId: string,
  ): Promise<OlympiadRegistrationDocument> {
    const registration = await this.findById(registrationId);

    if (this.hasRole(user, UserRole.SUPER_ADMIN)) {
      return registration;
    }

    if (this.hasRole(user, UserRole.STUDENT)) {
      const student = await this.studentsService.findByUserId(user.userId);
      if (registration.studentId.toString() !== student.id) {
        throw new ForbiddenException(
          'You do not have access to this registration',
        );
      }
      return registration;
    }

    throw new ForbiddenException('Insufficient permissions');
  }

  async listByOlympiad(
    user: AuthUser,
    olympiadId: string,
    query: ListRegistrationsQueryDto,
  ): Promise<PaginatedResult<OlympiadRegistrationDocument>> {
    this.assertSuperAdmin(user);
    this.assertObjectId(olympiadId, 'Olympiad');
    await this.olympiadsService.findById(olympiadId);

    const filter: RegistrationFilter = { olympiadId };
    if (query.status) {
      filter.status = query.status;
    }

    return this.paginate(filter, query.page ?? 1, query.limit ?? 20);
  }

  async updateStatusForAdmin(
    user: AuthUser,
    registrationId: string,
    dto: UpdateRegistrationStatusDto,
  ): Promise<OlympiadRegistrationDocument> {
    this.assertSuperAdmin(user);
    const registration = await this.findById(registrationId);

    if (registration.status !== OlympiadRegistrationStatus.PENDING) {
      throw new BadRequestException(
        `Cannot transition registration from ${registration.status} to ${dto.status}`,
      );
    }

    if (
      dto.status !== OlympiadRegistrationStatus.CONFIRMED &&
      dto.status !== OlympiadRegistrationStatus.REJECTED
    ) {
      throw new BadRequestException(
        'Administrative status updates must be CONFIRMED or REJECTED',
      );
    }

    if (dto.status === OlympiadRegistrationStatus.CONFIRMED) {
      const updated = await this.registrationModel
        .findByIdAndUpdate(
          registration.id,
          {
            $set: {
              status: OlympiadRegistrationStatus.CONFIRMED,
              confirmedAt: new Date(),
            },
            $unset: {
              cancelledAt: 1,
              rejectionReason: 1,
            },
          },
          { new: true },
        )
        .exec();
      if (!updated) {
        throw new NotFoundException('Registration not found');
      }
      return updated;
    }

    if (!dto.rejectionReason?.trim()) {
      throw new BadRequestException(
        'rejectionReason is required when rejecting a registration',
      );
    }

    const updated = await this.registrationModel
      .findByIdAndUpdate(
        registration.id,
        {
          $set: {
            status: OlympiadRegistrationStatus.REJECTED,
            rejectionReason: dto.rejectionReason.trim(),
          },
          $unset: {
            confirmedAt: 1,
            cancelledAt: 1,
          },
        },
        { new: true },
      )
      .exec();
    if (!updated) {
      throw new NotFoundException('Registration not found');
    }
    return updated;
  }

  async cancelForStudent(
    user: AuthUser,
    registrationId: string,
  ): Promise<OlympiadRegistrationDocument> {
    this.assertStudent(user);
    const registration = await this.findById(registrationId);
    const student = await this.studentsService.findByUserId(user.userId);

    if (registration.studentId.toString() !== student.id) {
      throw new ForbiddenException(
        'You can only cancel your own registration',
      );
    }

    if (!STUDENT_CANCELLABLE_STATUSES.includes(registration.status)) {
      throw new BadRequestException(
        `Cannot cancel a registration in ${registration.status} status`,
      );
    }

    const updated = await this.registrationModel
      .findByIdAndUpdate(
        registration.id,
        {
          $set: {
            status: OlympiadRegistrationStatus.CANCELLED,
            cancelledAt: new Date(),
          },
          $unset: {
            confirmedAt: 1,
            rejectionReason: 1,
          },
        },
        { new: true },
      )
      .exec();
    if (!updated) {
      throw new NotFoundException('Registration not found');
    }
    return updated;
  }

  private async findById(
    registrationId: string,
  ): Promise<OlympiadRegistrationDocument> {
    this.assertObjectId(registrationId, 'Registration');
    const registration = await this.registrationModel
      .findById(registrationId)
      .exec();
    if (!registration) {
      throw new NotFoundException('Registration not found');
    }
    return registration;
  }

  private async paginate(
    filter: RegistrationFilter,
    page: number,
    limit: number,
  ): Promise<PaginatedResult<OlympiadRegistrationDocument>> {
    const [items, total] = await Promise.all([
      this.registrationModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.registrationModel.countDocuments(filter).exec(),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  private assertStudent(user: AuthUser): void {
    if (!this.hasRole(user, UserRole.STUDENT)) {
      throw new ForbiddenException('Only students can perform this action');
    }
  }

  private assertSuperAdmin(user: AuthUser): void {
    if (!this.hasRole(user, UserRole.SUPER_ADMIN)) {
      throw new ForbiddenException('Insufficient permissions');
    }
  }

  private hasRole(user: AuthUser, role: UserRole): boolean {
    return user.roles.includes(role);
  }

  private assertObjectId(id: string, label: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`${label} not found`);
    }
  }

  private rethrowDuplicateConflict(error: unknown): void {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: number }).code === 11000
    ) {
      throw new ConflictException(
        'You are already registered for this olympiad',
      );
    }
  }
}
