import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import type { Express } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { GuardianRelation } from '../common/enums/guardian-relation.enum.js';
import { StudentClass } from '../common/enums/student-class.enum.js';
import { StudentProfileStatus } from '../common/enums/student-profile-status.enum.js';
import {
  School,
  type SchoolDocument,
} from '../schools/schemas/school.schema.js';
import { UsersService } from '../users/users.service.js';
import type {
  StudentMeProfileView,
  StudentMeResponse,
  StudentMeSchoolView,
  StudentProfileCompletionView,
  StudentProfileResponse,
} from './dto/student-me-response.js';
import type { UpdateStudentProfileDto } from './dto/student-profile.dto.js';
import {
  deleteLocalProfilePhoto,
  toProfilePhotoPublicUrl,
} from './profile-photo.storage.js';
import {
  StudentProfile,
  type StudentProfileDocument,
} from './schemas/student-profile.schema.js';

const PROFILE_COMPLETION_FIELDS = [
  'dateOfBirth',
  'academicClass',
  'section',
  'rollNumber',
  'academicYear',
  'schoolId',
  'guardian',
] as const;

export type CreateStudentProfileInput = {
  userId: Types.ObjectId | string;
  fullName: string;
  schoolId?: Types.ObjectId | string;
  dateOfBirth?: Date;
  academicClass?: StudentClass;
  section?: string;
  rollNumber?: string;
  academicYear?: string;
  guardian?: {
    name: string;
    phone: string;
    email?: string;
    relation: GuardianRelation;
  };
};

@Injectable()
export class StudentsService implements OnModuleInit {
  constructor(
    @InjectModel(StudentProfile.name)
    private readonly studentModel: Model<StudentProfileDocument>,
    @InjectModel(School.name)
    private readonly schoolModel: Model<SchoolDocument>,
    private readonly usersService: UsersService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.studentModel.collection.dropIndex(
        'schoolId_1_academicYear_1_rollNumber_1',
      );
    } catch {
      // Fresh databases, or the legacy unique index was already dropped.
    }
  }

  async create(
    input: CreateStudentProfileInput,
  ): Promise<StudentProfileDocument> {
    const existingProfile = await this.studentModel.exists({
      userId: input.userId,
    });
    if (existingProfile) {
      throw new ConflictException('Student profile already exists for this user');
    }

    if (input.schoolId && input.academicYear && input.rollNumber) {
      await this.assertRollNumberAvailable(
        input.schoolId,
        input.academicYear,
        input.rollNumber,
      );
    }

    return this.studentModel.create({
      userId: input.userId,
      fullName: input.fullName.trim(),
      ...(input.schoolId ? { schoolId: input.schoolId } : {}),
      ...(input.dateOfBirth ? { dateOfBirth: input.dateOfBirth } : {}),
      ...(input.academicClass ? { academicClass: input.academicClass } : {}),
      ...(input.section
        ? { section: input.section.trim().toUpperCase() }
        : {}),
      ...(input.rollNumber ? { rollNumber: input.rollNumber.trim() } : {}),
      ...(input.academicYear ? { academicYear: input.academicYear.trim() } : {}),
      ...(input.guardian
        ? {
            guardian: {
              name: input.guardian.name.trim(),
              phone: input.guardian.phone,
              email: input.guardian.email?.trim().toLowerCase(),
              relation: input.guardian.relation,
            },
          }
        : {}),
      status: StudentProfileStatus.PENDING,
    });
  }

  async findByUserId(userId: string): Promise<StudentProfileDocument> {
    const profile = await this.studentModel.findOne({ userId }).exec();
    if (!profile) {
      throw new NotFoundException('Student profile not found');
    }
    return profile;
  }

  /**
   * Authenticated student dashboard payload.
   * Identity is always derived from the JWT userId — never from client input.
   */
  async getMe(userId: string): Promise<StudentMeResponse> {
    const user = await this.usersService.findById(userId);
    const assembled = await this.assembleProfilePayload(userId);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
      },
      ...assembled,
    };
  }

  async getProfile(userId: string): Promise<StudentProfileResponse> {
    return this.assembleProfilePayload(userId);
  }

  async uploadProfilePhoto(
    userId: string,
    file: Express.Multer.File | undefined,
  ): Promise<{ message: string; profilePhoto: string }> {
    if (!file?.filename) {
      throw new BadRequestException('photo file is required');
    }

    const profilePhoto = toProfilePhotoPublicUrl(file.filename);
    const user = await this.usersService.findById(userId);
    let profile = await this.studentModel.findOne({ userId }).exec();

    if (!profile) {
      await this.create({
        userId,
        fullName: user.name,
      });
      profile = await this.studentModel.findOne({ userId }).exec();
    }

    if (!profile) {
      await deleteLocalProfilePhoto(profilePhoto);
      throw new NotFoundException('Student profile not found');
    }

    const previousPhoto = profile.profilePhoto;
    profile.profilePhoto = profilePhoto;

    try {
      await profile.save();
    } catch (error) {
      await deleteLocalProfilePhoto(profilePhoto);
      throw error;
    }

    if (previousPhoto && previousPhoto !== profilePhoto) {
      await deleteLocalProfilePhoto(previousPhoto);
    }

    return {
      message: 'Profile photo uploaded successfully',
      profilePhoto,
    };
  }

  async updateProfile(
    userId: string,
    dto: UpdateStudentProfileDto,
  ): Promise<StudentProfileResponse> {
    const user = await this.usersService.findById(userId);
    let profile = await this.studentModel.findOne({ userId }).exec();

    if (!profile) {
      await this.create({
        userId,
        fullName: dto.fullName?.trim() || user.name,
      });
      profile = await this.studentModel.findOne({ userId }).exec();
    }

    if (!profile) {
      throw new NotFoundException('Student profile not found');
    }

    if (this.computeProfileCompletion(profile).isComplete) {
      throw new ForbiddenException(
        'Profile details cannot be changed once completed',
      );
    }

    if (dto.schoolCode) {
      const school = await this.schoolModel
        .findOne({ code: dto.schoolCode.trim().toUpperCase() })
        .exec();
      if (!school) {
        throw new NotFoundException('School not found for this school code');
      }
      profile.schoolId = school._id as Types.ObjectId;
    }

    if (dto.fullName) {
      profile.fullName = dto.fullName.trim();
    }
    if (dto.dateOfBirth) {
      profile.dateOfBirth = new Date(dto.dateOfBirth);
    }
    if (dto.academicClass) {
      profile.academicClass = dto.academicClass;
    }
    if (dto.section) {
      profile.section = dto.section.trim().toUpperCase();
    }
    if (dto.rollNumber) {
      profile.rollNumber = dto.rollNumber.trim();
    }
    if (dto.aadharNumber) {
      const aadharNumber = dto.aadharNumber.trim();
      const aadharTaken = await this.studentModel.exists({
        aadharNumber,
        _id: { $ne: profile.id },
      });
      if (aadharTaken) {
        throw new ConflictException('Aadhar number is already registered');
      }
      profile.aadharNumber = aadharNumber;
    }
    if (dto.academicYear) {
      profile.academicYear = dto.academicYear.trim();
    }
    if (dto.guardian) {
      profile.guardian = {
        name: dto.guardian.name.trim(),
        phone: dto.guardian.phone,
        email: dto.guardian.email?.trim().toLowerCase(),
        relation: dto.guardian.relation,
      };
    }

    if (profile.schoolId && profile.academicYear && profile.rollNumber) {
      await this.assertRollNumberAvailable(
        profile.schoolId,
        profile.academicYear,
        profile.rollNumber,
        profile.id,
      );
    }

    const completion = this.computeProfileCompletion(profile);
    if (
      completion.isComplete &&
      profile.status === StudentProfileStatus.PENDING
    ) {
      profile.status = StudentProfileStatus.ACTIVE;
    }

    await profile.save();
    return this.assembleProfilePayload(userId);
  }

  async findById(id: string): Promise<StudentProfileDocument> {
    const profile = await this.studentModel.findById(id).exec();
    if (!profile) {
      throw new NotFoundException('Student profile not found');
    }
    return profile;
  }

  async listBySchoolId(
    schoolId: string,
    page: number,
    limit: number,
  ): Promise<{ items: StudentProfileDocument[]; total: number }> {
    if (!Types.ObjectId.isValid(schoolId)) {
      throw new NotFoundException('School not found');
    }

    const filter = { schoolId };
    const [items, total] = await Promise.all([
      this.studentModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.studentModel.countDocuments(filter).exec(),
    ]);

    return { items, total };
  }

  private async assembleProfilePayload(
    userId: string,
  ): Promise<StudentProfileResponse> {
    const profile = await this.studentModel.findOne({ userId }).exec();
    const school = profile?.schoolId
      ? await this.schoolModel.findById(profile.schoolId).exec()
      : null;

    return {
      profile: profile ? this.toProfileView(profile) : null,
      school: school ? this.toSchoolView(school) : null,
      profileCompletion: this.computeProfileCompletion(profile),
    };
  }

  private computeProfileCompletion(
    profile: StudentProfileDocument | null,
  ): StudentProfileCompletionView {
    const missingFields: string[] = [];

    if (!profile) {
      return {
        percentage: 0,
        isComplete: false,
        missingFields: [...PROFILE_COMPLETION_FIELDS],
      };
    }

    for (const field of PROFILE_COMPLETION_FIELDS) {
      if (field === 'guardian') {
        const guardian = profile.guardian;
        if (!guardian?.name || !guardian?.phone || !guardian?.relation) {
          missingFields.push(field);
        }
        continue;
      }

      const value = profile[field];
      if (value == null || value === '') {
        missingFields.push(field);
      }
    }

    const filled = PROFILE_COMPLETION_FIELDS.length - missingFields.length;
    const percentage = Math.round(
      (filled / PROFILE_COMPLETION_FIELDS.length) * 100,
    );

    return {
      percentage,
      isComplete: missingFields.length === 0,
      missingFields,
    };
  }

  private toProfileView(profile: StudentProfileDocument): StudentMeProfileView {
    return {
      id: profile.id,
      fullName: profile.fullName,
      dateOfBirth: profile.dateOfBirth
        ? profile.dateOfBirth.toISOString()
        : null,
      academicClass: profile.academicClass ?? null,
      section: profile.section ?? null,
      rollNumber: profile.rollNumber ?? null,
      aadharNumber: profile.aadharNumber ?? null,
      academicYear: profile.academicYear ?? null,
      profilePhoto: profile.profilePhoto ?? null,
      status: profile.status,
      guardian: profile.guardian
        ? {
            name: profile.guardian.name,
            phone: profile.guardian.phone,
            email: profile.guardian.email,
            relation: profile.guardian.relation,
          }
        : null,
    };
  }

  private toSchoolView(school: SchoolDocument): StudentMeSchoolView {
    return {
      id: school.id,
      code: school.code,
      name: school.name,
    };
  }

  private async assertRollNumberAvailable(
    schoolId: Types.ObjectId | string,
    academicYear: string,
    rollNumber: string,
    excludeProfileId?: string,
  ): Promise<void> {
    const filter: Record<string, unknown> = {
      schoolId,
      academicYear: academicYear.trim(),
      rollNumber: rollNumber.trim(),
    };
    if (excludeProfileId) {
      filter._id = { $ne: excludeProfileId };
    }

    const rollTaken = await this.studentModel.exists(filter);
    if (rollTaken) {
      throw new ConflictException(
        'Roll number already exists for this school and academic year',
      );
    }
  }
}
