import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import type { StudentMeResponse } from './dto/student-me-response.js';
import {
  StudentProfile,
  type StudentProfileDocument,
} from './schemas/student-profile.schema.js';

export type CreateStudentProfileInput = {
  userId: Types.ObjectId | string;
  schoolId: Types.ObjectId | string;
  fullName: string;
  dateOfBirth: Date;
  academicClass: StudentClass;
  section: string;
  rollNumber: string;
  academicYear: string;
  guardian: {
    name: string;
    phone: string;
    email?: string;
    relation: GuardianRelation;
  };
};

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(StudentProfile.name)
    private readonly studentModel: Model<StudentProfileDocument>,
    @InjectModel(School.name)
    private readonly schoolModel: Model<SchoolDocument>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    input: CreateStudentProfileInput,
  ): Promise<StudentProfileDocument> {
    const existingProfile = await this.studentModel.exists({
      userId: input.userId,
    });
    if (existingProfile) {
      throw new ConflictException('Student profile already exists for this user');
    }

    const rollTaken = await this.studentModel.exists({
      schoolId: input.schoolId,
      academicYear: input.academicYear,
      rollNumber: input.rollNumber.trim(),
    });
    if (rollTaken) {
      throw new ConflictException(
        'Roll number already exists for this school and academic year',
      );
    }

    return this.studentModel.create({
      userId: input.userId,
      schoolId: input.schoolId,
      fullName: input.fullName.trim(),
      dateOfBirth: input.dateOfBirth,
      academicClass: input.academicClass,
      section: input.section.trim().toUpperCase(),
      rollNumber: input.rollNumber.trim(),
      academicYear: input.academicYear.trim(),
      guardian: {
        name: input.guardian.name.trim(),
        phone: input.guardian.phone,
        email: input.guardian.email?.trim().toLowerCase(),
        relation: input.guardian.relation,
      },
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
    const [user, profile] = await Promise.all([
      this.usersService.findById(userId),
      this.findByUserId(userId),
    ]);

    const school = await this.schoolModel.findById(profile.schoolId).exec();
    if (!school) {
      throw new NotFoundException('School not found');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
      },
      profile: {
        id: profile.id,
        fullName: profile.fullName,
        dateOfBirth: profile.dateOfBirth.toISOString(),
        academicClass: profile.academicClass,
        section: profile.section,
        rollNumber: profile.rollNumber,
        academicYear: profile.academicYear,
        status: profile.status,
      },
      school: {
        id: school.id,
        code: school.code,
        name: school.name,
      },
    };
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
}
