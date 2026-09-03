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
