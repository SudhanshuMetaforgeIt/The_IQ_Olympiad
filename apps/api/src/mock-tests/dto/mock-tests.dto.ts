import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
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
import {
  MockTestStatus,
  MOCK_TEST_STATUSES,
} from '../../common/enums/mock-test-status.enum.js';

export class MockTestSectionDto {
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

export class MockTestQuestionDto {
  @IsMongoId()
  questionId: string;

  @IsInt()
  @Min(1)
  marks: number;

  @IsInt()
  @Min(0)
  order: number;
}

export class CreateMockTestDto {
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

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MockTestSectionDto)
  sections: MockTestSectionDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MockTestQuestionDto)
  questions: MockTestQuestionDto[];
}

export class UpdateMockTestDto {
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
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MockTestSectionDto)
  sections?: MockTestSectionDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MockTestQuestionDto)
  questions?: MockTestQuestionDto[];
}

export class ListMockTestsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  search?: string;

  @IsOptional()
  @IsEnum(MockTestStatus)
  status?: MockTestStatus;

  @IsOptional()
  @IsEnum(CognitiveDomain)
  cognitiveDomain?: CognitiveDomain;
}

export class UpdateMockTestStatusDto {
  @IsEnum(MockTestStatus, {
    message: `status must be one of: ${MOCK_TEST_STATUSES.join(', ')}`,
  })
  status: MockTestStatus;
}
