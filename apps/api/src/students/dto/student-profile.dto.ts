import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { GuardianRelation } from '../../common/enums/guardian-relation.enum.js';
import { StudentClass } from '../../common/enums/student-class.enum.js';

const PHONE_REGEX = /^[6-9]\d{9}$/;
const ACADEMIC_YEAR_REGEX = /^\d{4}-\d{2}$/;
const SCHOOL_CODE_REGEX = /^[A-Z0-9-]+$/;

export class UpdateStudentGuardianDto {
  @IsString()
  @MaxLength(120)
  name: string;

  @Matches(PHONE_REGEX, {
    message: 'guardian.phone must be a valid 10-digit Indian mobile number',
  })
  phone: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsEnum(GuardianRelation)
  relation: GuardianRelation;
}

export class UpdateStudentProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  fullName?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(StudentClass)
  academicClass?: StudentClass;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  section?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  rollNumber?: string;

  @IsOptional()
  @Matches(/^\d{12}$/, {
    message: 'aadharNumber must be a 12-digit number',
  })
  aadharNumber?: string;

  @IsOptional()
  @Matches(ACADEMIC_YEAR_REGEX, {
    message: 'academicYear must match YYYY-YY format (e.g. 2026-27)',
  })
  academicYear?: string;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(SCHOOL_CODE_REGEX, {
    message: 'schoolCode must be alphanumeric with optional hyphens',
  })
  schoolCode?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateStudentGuardianDto)
  guardian?: UpdateStudentGuardianDto;
}
