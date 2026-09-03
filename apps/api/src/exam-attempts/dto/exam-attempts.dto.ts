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
import { ExamAttemptStatus } from '../../common/enums/exam-attempt-status.enum.js';

export class ExamAttemptAnswerDto {
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

export class SaveExamAnswersDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ExamAttemptAnswerDto)
  answers: ExamAttemptAnswerDto[];
}

export class ListMyExamAttemptsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(ExamAttemptStatus)
  status?: ExamAttemptStatus;

  @IsOptional()
  @IsMongoId()
  examId?: string;
}
