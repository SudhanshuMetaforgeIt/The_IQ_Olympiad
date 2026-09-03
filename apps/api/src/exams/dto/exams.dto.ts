import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import { CognitiveDomain } from '../../common/enums/cognitive-domain.enum.js';
import { ExamStatus, EXAM_STATUSES } from '../../common/enums/exam-status.enum.js';

export class ExamSectionDto {
  @IsEnum(CognitiveDomain)
  cognitiveDomain: CognitiveDomain;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  instructions?: string;

  @IsInt()
  @Min(1)
  marks: number;

  @IsInt()
  @Min(1)
  questionCount: number;
}

export class ExamQuestionDto {
  @IsMongoId()
  questionId: string;

  @IsInt()
  @Min(1)
  marks: number;

  @IsInt()
  @Min(1)
  order: number;
}

export class CreateExamDto {
  @IsMongoId()
  olympiadId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsInt()
  @Min(1)
  durationMinutes: number;

  @IsInt()
  @Min(1)
  totalMarks: number;

  @IsInt()
  @Min(1)
  totalQuestions: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExamSectionDto)
  sections?: ExamSectionDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExamQuestionDto)
  questions?: ExamQuestionDto[];

  @IsDateString()
  startsAt: string;

  @IsDateString()
  endsAt: string;
}

export class UpdateExamDto {
  @IsOptional()
  @IsMongoId()
  olympiadId?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationMinutes?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  totalMarks?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  totalQuestions?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExamSectionDto)
  sections?: ExamSectionDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExamQuestionDto)
  questions?: ExamQuestionDto[];

  @IsOptional()
  @IsDateString()
  startsAt?: string;

  @IsOptional()
  @IsDateString()
  endsAt?: string;
}

export class ListExamsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  search?: string;

  @IsOptional()
  @IsMongoId()
  olympiadId?: string;

  @IsOptional()
  @IsEnum(ExamStatus)
  status?: ExamStatus;
}

export class UpdateExamStatusDto {
  @IsEnum(ExamStatus, {
    message: `status must be one of: ${EXAM_STATUSES.join(', ')}`,
  })
  status: ExamStatus;
}
