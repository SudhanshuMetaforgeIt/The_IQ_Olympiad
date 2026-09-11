import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import {
  CognitiveDomain,
  COGNITIVE_DOMAINS,
} from '../../common/enums/cognitive-domain.enum.js';
import { protectImmutableHistory } from '../../common/mongoose/protect-immutable-history.js';
import { QuestionVersion } from '../../questions/schemas/question-version.schema.js';
import { Question } from '../../questions/schemas/question.schema.js';
import { Exam, ExamSection, ExamSectionSchema } from './exam.schema.js';

export type ExamVersionDocument = HydratedDocument<ExamVersion>;

@Schema({ _id: false })
export class ExamVersionQuestion {
  @Prop({
    type: Types.ObjectId,
    ref: Question.name,
    required: true,
    immutable: true,
  })
  questionId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: QuestionVersion.name,
    required: true,
    immutable: true,
  })
  questionVersionId: Types.ObjectId;

  @Prop({
    type: String,
    enum: COGNITIVE_DOMAINS,
    required: true,
    immutable: true,
  })
  cognitiveDomain: CognitiveDomain;

  @Prop({
    required: true,
    min: 1,
    immutable: true,
    validate: {
      validator: Number.isInteger,
      message: 'question marks must be a positive integer',
    },
  })
  marks: number;

  @Prop({
    required: true,
    min: 1,
    immutable: true,
    validate: {
      validator: Number.isInteger,
      message: 'question order must be a positive integer',
    },
  })
  order: number;
}

export const ExamVersionQuestionSchema =
  SchemaFactory.createForClass(ExamVersionQuestion);

/**
 * Frozen assessment configuration. Attempts reference this document while
 * question content is resolved through immutable QuestionVersion documents.
 */
@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'exam_versions',
})
export class ExamVersion {
  @Prop({
    type: Types.ObjectId,
    ref: Exam.name,
    required: true,
    immutable: true,
  })
  examId: Types.ObjectId;

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
    maxlength: 200,
    immutable: true,
  })
  title: string;

  @Prop({ trim: true, maxlength: 2000, immutable: true })
  description?: string;

  @Prop({
    required: true,
    min: 1,
    immutable: true,
    validate: {
      validator: Number.isInteger,
      message: 'durationMinutes must be a positive integer',
    },
  })
  durationMinutes: number;

  @Prop({
    required: true,
    min: 1,
    immutable: true,
    validate: {
      validator: Number.isInteger,
      message: 'totalMarks must be a positive integer',
    },
  })
  totalMarks: number;

  @Prop({
    required: true,
    min: 1,
    immutable: true,
    validate: {
      validator: Number.isInteger,
      message: 'totalQuestions must be a positive integer',
    },
  })
  totalQuestions: number;

  @Prop({
    type: [ExamSectionSchema],
    required: true,
    immutable: true,
  })
  sections: ExamSection[];

  @Prop({
    type: [ExamVersionQuestionSchema],
    required: true,
    immutable: true,
    validate: {
      validator: (questions: ExamVersionQuestion[]) => {
        const questionIds = questions.map((question) =>
          question.questionId.toString(),
        );
        const versionIds = questions.map((question) =>
          question.questionVersionId.toString(),
        );
        const orders = questions.map((question) => question.order);
        return (
          new Set(questionIds).size === questionIds.length &&
          new Set(versionIds).size === versionIds.length &&
          new Set(orders).size === orders.length
        );
      },
      message:
        'questions must contain unique question, version, and order values',
    },
  })
  questions: ExamVersionQuestion[];

  @Prop({
    required: true,
    default: () => new Date(),
    immutable: true,
  })
  publishedAt: Date;

  createdAt: Date;
}

export const ExamVersionSchema = SchemaFactory.createForClass(ExamVersion);

ExamVersionSchema.index({ examId: 1, version: 1 }, { unique: true });
ExamVersionSchema.index({ examId: 1, publishedAt: -1 });
ExamVersionSchema.index({ 'questions.questionVersionId': 1 });

protectImmutableHistory(ExamVersionSchema, ExamVersion.name);
