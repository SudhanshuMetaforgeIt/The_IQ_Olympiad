import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import { MockTestAttemptStatus } from '../../common/enums/mock-test-attempt-status.enum.js';

export class MockTestAttemptAnswerDto {
  @IsMongoId()
  questionId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  selectedOptionIds?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(10000)
  responseText?: string;
}

export class SaveMockTestAnswersDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MockTestAttemptAnswerDto)
  answers: MockTestAttemptAnswerDto[];
}

export class ListMyMockTestAttemptsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(MockTestAttemptStatus)
  status?: MockTestAttemptStatus;

  @IsOptional()
  @IsMongoId()
  mockTestId?: string;
}
