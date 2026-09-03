import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import {
  OlympiadStatus,
  OLYMPIAD_STATUSES,
} from '../../common/enums/olympiad-status.enum.js';
import { StudentClass } from '../../common/enums/student-class.enum.js';

const CODE_REGEX = /^[A-Z0-9-]+$/;
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ACADEMIC_YEAR_REGEX = /^\d{4}-\d{2}$/;

export class CreateOlympiadDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(40)
  @Matches(CODE_REGEX, {
    message: 'code must be uppercase alphanumeric with optional hyphens',
  })
  code: string;

  @IsString()
  @MinLength(1)
  @MaxLength(120)
  @Matches(SLUG_REGEX, {
    message: 'slug must be lowercase kebab-case',
  })
  slug: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @Matches(ACADEMIC_YEAR_REGEX, {
    message: 'academicYear must match YYYY-YY format (e.g. 2026-27)',
  })
  academicYear: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(StudentClass, { each: true })
  eligibleClasses: StudentClass[];

  @IsDateString()
  registrationStartsAt: string;

  @IsDateString()
  registrationEndsAt: string;
}

export class UpdateOlympiadDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  @Matches(CODE_REGEX, {
    message: 'code must be uppercase alphanumeric with optional hyphens',
  })
  code?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  @Matches(SLUG_REGEX, {
    message: 'slug must be lowercase kebab-case',
  })
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @Matches(ACADEMIC_YEAR_REGEX, {
    message: 'academicYear must match YYYY-YY format (e.g. 2026-27)',
  })
  academicYear?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(StudentClass, { each: true })
  eligibleClasses?: StudentClass[];

  @IsOptional()
  @IsDateString()
  registrationStartsAt?: string;

  @IsOptional()
  @IsDateString()
  registrationEndsAt?: string;
}

export class ListOlympiadsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @IsOptional()
  @IsEnum(OlympiadStatus)
  status?: OlympiadStatus;

  @IsOptional()
  @Matches(ACADEMIC_YEAR_REGEX)
  academicYear?: string;

  @IsOptional()
  @IsEnum(StudentClass)
  eligibleClass?: StudentClass;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  registrationOpen?: boolean;
}

export class UpdateOlympiadStatusDto {
  @IsEnum(OlympiadStatus, {
    message: `status must be one of: ${OLYMPIAD_STATUSES.join(', ')}`,
  })
  status: OlympiadStatus;
}
