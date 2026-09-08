import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import { CognitiveDomain } from '../../common/enums/cognitive-domain.enum.js';
import { QuestionDifficulty } from '../../common/enums/question-difficulty.enum.js';
import { QuestionSource } from '../../common/enums/question-source.enum.js';
import {
  QuestionStatus,
  QUESTION_STATUSES,
} from '../../common/enums/question-status.enum.js';
import { QuestionType } from '../../common/enums/question-type.enum.js';

export class QuestionOptionDto {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  id: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  text: string;
}

export class QuestionGenerationDto {
  @IsEnum(QuestionSource)
  source: QuestionSource;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  model?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  promptVersion?: string;

  @IsOptional()
  @IsDateString()
  generatedAt?: string;
}

export class CreateQuestionDto {
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  questionText: string;

  @IsEnum(QuestionType)
  questionType: QuestionType;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionDto)
  options?: QuestionOptionDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  correctOptionIds?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  expectedAnswer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  evaluationCriteria?: string;

  @IsEnum(CognitiveDomain)
  cognitiveDomain: CognitiveDomain;

  @IsEnum(QuestionDifficulty)
  difficulty: QuestionDifficulty;

  @IsInt()
  @Min(1)
  @Max(100)
  marks: number;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  explanation?: string;

  @ValidateNested()
  @Type(() => QuestionGenerationDto)
  generation: QuestionGenerationDto;
}

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  questionText?: string;

  @IsOptional()
  @IsEnum(QuestionType)
  questionType?: QuestionType;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionDto)
  options?: QuestionOptionDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  correctOptionIds?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  expectedAnswer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  evaluationCriteria?: string;

  @IsOptional()
  @IsEnum(CognitiveDomain)
  cognitiveDomain?: CognitiveDomain;

  @IsOptional()
  @IsEnum(QuestionDifficulty)
  difficulty?: QuestionDifficulty;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  marks?: number;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  explanation?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => QuestionGenerationDto)
  generation?: QuestionGenerationDto;
}

export class ListQuestionsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  search?: string;

  @IsOptional()
  @IsEnum(QuestionStatus)
  status?: QuestionStatus;

  @IsOptional()
  @IsEnum(CognitiveDomain)
  cognitiveDomain?: CognitiveDomain;

  @IsOptional()
  @IsEnum(QuestionDifficulty)
  difficulty?: QuestionDifficulty;

  @IsOptional()
  @IsEnum(QuestionType)
  questionType?: QuestionType;

  @IsOptional()
  @IsEnum(QuestionSource)
  source?: QuestionSource;
}

export class UpdateQuestionStatusDto {
  @IsEnum(QuestionStatus, {
    message: `status must be one of: ${QUESTION_STATUSES.join(', ')}`,
  })
  status: QuestionStatus;
}

/** Student-facing filters for approved questions (status is always APPROVED). */
export class ListApprovedQuestionsQueryDto {
  @IsOptional()
  @IsEnum(CognitiveDomain)
  cognitiveDomain?: CognitiveDomain;

  @IsOptional()
  @IsEnum(QuestionDifficulty)
  difficulty?: QuestionDifficulty;
}

/** Safe question payload — never includes answers, explanations, or generation metadata. */
export type StudentQuestionResponse = {
  id: string;
  questionText: string;
  questionType: QuestionType;
  cognitiveDomain: CognitiveDomain;
  difficulty: QuestionDifficulty;
  options: QuestionOptionDto[];
  marks: number;
};

export type DemoExamQuestionsResponse = {
  title: string;
  totalQuestions: number;
  totalMarks: number;
  marksPerQuestion: number;
  questions: StudentQuestionResponse[];
};

/** One student answer for the demo paper (option IDs only — never correct keys). */
export class DemoExamAnswerDto {
  @IsMongoId()
  questionId: string;

  @IsArray()
  @IsString({ each: true })
  selectedOptionIds: string[];
}

export class SubmitDemoExamAnswersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DemoExamAnswerDto)
  answers: DemoExamAnswerDto[];
}

export type DemoExamSectionScoreResponse = {
  cognitiveDomain: CognitiveDomain;
  score: number;
  maxScore: number;
  attempted: number;
  correct: number;
};

/** Safe demo result — never includes correctOptionIds or explanations. */
export type DemoExamResultResponse = {
  totalScore: number;
  totalMarks: number;
  attempted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattempted: number;
  sectionScores: DemoExamSectionScoreResponse[];
};
