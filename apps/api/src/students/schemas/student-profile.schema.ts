import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import {
  GuardianRelation,
  GUARDIAN_RELATIONS,
} from '../../common/enums/guardian-relation.enum.js';
import {
  StudentClass,
  STUDENT_CLASSES,
} from '../../common/enums/student-class.enum.js';
import {
  StudentProfileStatus,
  STUDENT_PROFILE_STATUSES,
} from '../../common/enums/student-profile-status.enum.js';
import { School } from '../../schools/schemas/school.schema.js';
import { User } from '../../users/schemas/user.schema.js';

const MAX_STUDENT_AGE_YEARS = 30;

function isValidDate(value: Date): boolean {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export function calculateAge(
  dateOfBirth: Date,
  asOf: Date = new Date(),
): number {
  if (!isValidDate(dateOfBirth) || !isValidDate(asOf)) {
    throw new RangeError('dateOfBirth and asOf must be valid dates');
  }

  let age = asOf.getUTCFullYear() - dateOfBirth.getUTCFullYear();
  const monthDifference = asOf.getUTCMonth() - dateOfBirth.getUTCMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && asOf.getUTCDate() < dateOfBirth.getUTCDate())
  ) {
    age -= 1;
  }

  return age;
}

function isValidStudentDateOfBirth(value: Date): boolean {
  if (!isValidDate(value)) {
    return false;
  }

  const now = new Date();
  const age = calculateAge(value, now);
  return value < now && age >= 0 && age <= MAX_STUDENT_AGE_YEARS;
}

export type StudentProfileDocument = HydratedDocument<StudentProfile>;

@Schema({ _id: false })
export class StudentGuardian {
  @Prop({ required: true, trim: true, maxlength: 120 })
  name: string;

  @Prop({
    required: true,
    trim: true,
    match: /^[6-9]\d{9}$/,
  })
  phone: string;

  @Prop({
    lowercase: true,
    trim: true,
    maxlength: 255,
  })
  email?: string;

  @Prop({
    type: String,
    enum: GUARDIAN_RELATIONS,
    required: true,
  })
  relation: GuardianRelation;
}

export const StudentGuardianSchema =
  SchemaFactory.createForClass(StudentGuardian);

/**
 * Student-specific academic and domain data.
 * Auth/identity/RBAC stay on User; institution details stay on School.
 */
@Schema({
  timestamps: true,
  collection: 'student_profiles',
})
export class StudentProfile {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    unique: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: School.name,
    required: true,
    index: true,
  })
  schoolId: Types.ObjectId;

  @Prop({
    required: true,
    trim: true,
    maxlength: 120,
  })
  fullName: string;

  @Prop({
    type: Date,
    required: true,
    cast: 'dateOfBirth must be a valid date',
    validate: {
      validator: isValidStudentDateOfBirth,
      message:
        'dateOfBirth must be in the past and represent an age of 30 years or less',
    },
  })
  dateOfBirth: Date;

  @Prop({
    type: String,
    enum: STUDENT_CLASSES,
    required: true,
    index: true,
  })
  academicClass: StudentClass;

  @Prop({
    required: true,
    trim: true,
    uppercase: true,
    maxlength: 20,
  })
  section: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: 40,
  })
  rollNumber: string;

  @Prop({
    required: true,
    trim: true,
    match: /^\d{4}-\d{2}$/,
  })
  academicYear: string;

  @Prop({
    type: StudentGuardianSchema,
    required: true,
  })
  guardian: StudentGuardian;

  @Prop({
    type: String,
    enum: STUDENT_PROFILE_STATUSES,
    default: StudentProfileStatus.PENDING,
    index: true,
  })
  status: StudentProfileStatus;
}

export const StudentProfileSchema =
  SchemaFactory.createForClass(StudentProfile);

StudentProfileSchema.index(
  { schoolId: 1, academicYear: 1, rollNumber: 1 },
  { unique: true },
);
StudentProfileSchema.index({ schoolId: 1, academicClass: 1, section: 1 });
StudentProfileSchema.index({ status: 1, createdAt: -1 });
