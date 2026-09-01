import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import {
  CognitiveDomain,
  COGNITIVE_DOMAINS,
} from '../../common/enums/cognitive-domain.enum.js';
import {
  QuestionDifficulty,
  QUESTION_DIFFICULTIES,
} from '../../common/enums/question-difficulty.enum.js';
import {
  QuestionSource,
  QUESTION_SOURCES,
} from '../../common/enums/question-source.enum.js';
import {
  QuestionStatus,
  QUESTION_STATUSES,
} from '../../common/enums/question-status.enum.js';
import {
  QuestionType,
  QUESTION_TYPES,
} from '../../common/enums/question-type.enum.js';
import {
  hasUniqueOptionIds,
  validateQuestionAnswers,
} from '../validators/question-content.validator.js';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ _id: false })
export class QuestionOption {
  @Prop({ required: true, trim: true, maxlength: 40 })
  id: string;

  @Prop({ required: true, trim: true, maxlength: 1000 })
  text: string;
}

export const QuestionOptionSchema =
  SchemaFactory.createForClass(QuestionOption);

@Schema({ _id: false })
export class QuestionGeneration {
  @Prop({
    type: String,
    enum: QUESTION_SOURCES,
    required: true,
  })
  source: QuestionSource;

  @Prop({ trim: true, maxlength: 120 })
  model?: string;

  @Prop({ trim: true, maxlength: 60 })
  promptVersion?: string;

  @Prop()
  generatedAt?: Date;
}

export const QuestionGenerationSchema =
  SchemaFactory.createForClass(QuestionGeneration);

/**
 * Question bank item for olympiad exams and future mock/practice flows.
 * Options stay flexible for MCQ / multi-select; open-ended may omit options.
 */
@Schema({
  timestamps: true,
  collection: 'questions',
})
export class Question {
  @Prop({
    required: true,
    trim: true,
    maxlength: 5000,
  })
  questionText: string;

  @Prop({
    type: String,
    enum: QUESTION_TYPES,
    required: true,
    index: true,
  })
  questionType: QuestionType;

  @Prop({
    type: [QuestionOptionSchema],
    default: [],
    validate: {
      validator: hasUniqueOptionIds,
      message: 'Option IDs must be unique within a question',
    },
  })
  options: QuestionOption[];

  @Prop({
    type: [String],
    default: [],
    validate: {
      validator: function (this: Question, value: string[]) {
        return (
          validateQuestionAnswers({
            questionType: this.questionType,
            options: this.options,
            correctOptionIds: value,
          }) === true
        );
      },
      message:
        'Correct option IDs must match the question type and exist in options',
    },
  })
  correctOptionIds: string[];

  @Prop({
    trim: true,
    maxlength: 5000,
  })
  expectedAnswer?: string;

  @Prop({
    trim: true,
    maxlength: 5000,
  })
  evaluationCriteria?: string;

  @Prop({
    type: String,
    enum: COGNITIVE_DOMAINS,
    required: true,
    index: true,
  })
  cognitiveDomain: CognitiveDomain;

  @Prop({
    type: String,
    enum: QUESTION_DIFFICULTIES,
    required: true,
    index: true,
  })
  difficulty: QuestionDifficulty;

  @Prop({
    required: true,
    min: 1,
    max: 100,
    validate: {
      validator: Number.isInteger,
      message: 'marks must be a positive integer',
    },
  })
  marks: number;

  @Prop({
    trim: true,
    maxlength: 5000,
  })
  explanation?: string;

  @Prop({
    type: String,
    enum: QUESTION_STATUSES,
    default: QuestionStatus.DRAFT,
    index: true,
  })
  status: QuestionStatus;

  @Prop({
    type: QuestionGenerationSchema,
    required: true,
  })
  generation: QuestionGeneration;

  @Prop({
    default: 0,
    min: 0,
  })
  usageCount: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

QuestionSchema.index({ status: 1, cognitiveDomain: 1, difficulty: 1 });
QuestionSchema.index({ questionType: 1, status: 1 });
QuestionSchema.index({ 'generation.source': 1, createdAt: -1 });
QuestionSchema.index({ usageCount: -1 });
