import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import {
  CognitiveDomain,
  COGNITIVE_DOMAINS,
} from '../../common/enums/cognitive-domain.enum.js';
import {
  QuestionDifficulty,
  QUESTION_DIFFICULTIES,
} from '../../common/enums/question-difficulty.enum.js';
import {
  QuestionType,
  QUESTION_TYPES,
} from '../../common/enums/question-type.enum.js';
import { protectImmutableHistory } from '../../common/mongoose/protect-immutable-history.js';
import {
  hasUniqueOptionIds,
  validateQuestionAnswers,
} from '../validators/question-content.validator.js';
import {
  Question,
  QuestionGeneration,
  QuestionGenerationSchema,
  QuestionOption,
  QuestionOptionSchema,
} from './question.schema.js';

export type QuestionVersionDocument = HydratedDocument<QuestionVersion>;

/**
 * Explicit, immutable revision of question content.
 * Future services create a new version instead of editing an existing revision.
 */
@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'question_versions',
})
export class QuestionVersion {
  @Prop({
    type: Types.ObjectId,
    ref: Question.name,
    required: true,
    immutable: true,
  })
  questionId: Types.ObjectId;

  @Prop({
    required: true,
    min: 1,
    immutable: true,
    validate: {
      validator: Number.isInteger,
      message: 'version must be a positive integer',
    },
  })
  version: number;

  @Prop({
    required: true,
    trim: true,
    maxlength: 5000,
    immutable: true,
  })
  questionText: string;

  @Prop({
    type: String,
    enum: QUESTION_TYPES,
    required: true,
    immutable: true,
  })
  questionType: QuestionType;

  @Prop({
    type: [QuestionOptionSchema],
    default: [],
    immutable: true,
    validate: {
      validator: hasUniqueOptionIds,
      message: 'Option IDs must be unique within a question version',
    },
  })
  options: QuestionOption[];

  @Prop({
    type: [String],
    default: [],
    immutable: true,
    validate: {
      validator: function (this: QuestionVersion, value: string[]) {
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

  @Prop({ trim: true, maxlength: 5000, immutable: true })
  expectedAnswer?: string;

  @Prop({ trim: true, maxlength: 5000, immutable: true })
  evaluationCriteria?: string;

  @Prop({
    type: String,
    enum: COGNITIVE_DOMAINS,
    required: true,
    immutable: true,
  })
  cognitiveDomain: CognitiveDomain;

  @Prop({
    type: String,
    enum: QUESTION_DIFFICULTIES,
    required: true,
    immutable: true,
  })
  difficulty: QuestionDifficulty;

  @Prop({
    required: true,
    min: 1,
    max: 100,
    immutable: true,
    validate: {
      validator: Number.isInteger,
      message: 'marks must be a positive integer',
    },
  })
  marks: number;

  @Prop({ trim: true, maxlength: 5000, immutable: true })
  explanation?: string;

  @Prop({
    type: QuestionGenerationSchema,
    immutable: true,
  })
  generation?: QuestionGeneration;

  createdAt: Date;
}

export const QuestionVersionSchema =
  SchemaFactory.createForClass(QuestionVersion);

QuestionVersionSchema.index({ questionId: 1, version: 1 }, { unique: true });
QuestionVersionSchema.index({ cognitiveDomain: 1, difficulty: 1 });
QuestionVersionSchema.index({ createdAt: -1 });

protectImmutableHistory(QuestionVersionSchema, QuestionVersion.name);
