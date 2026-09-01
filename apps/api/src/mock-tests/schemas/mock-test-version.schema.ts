import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import {
  CognitiveDomain,
  COGNITIVE_DOMAINS,
} from '../../common/enums/cognitive-domain.enum.js';
import { protectImmutableHistory } from '../../common/mongoose/protect-immutable-history.js';
import { QuestionVersion } from '../../questions/schemas/question-version.schema.js';
import { Question } from '../../questions/schemas/question.schema.js';
import {
  MockTest,
  MockTestSection,
  MockTestSectionSchema,
} from './mock-test.schema.js';

export type MockTestVersionDocument = HydratedDocument<MockTestVersion>;

@Schema({ _id: false })
export class MockTestVersionQuestion {
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
    min: 0,
    immutable: true,
    validate: {
      validator: Number.isInteger,
      message: 'question order must be a non-negative integer',
    },
  })
  order: number;
}

export const MockTestVersionQuestionSchema = SchemaFactory.createForClass(
  MockTestVersionQuestion,
);

/**
 * Frozen practice assessment configuration backed by immutable question
 * revisions. Multiple attempts may reference the same published version.
 */
@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'mock_test_versions',
})
export class MockTestVersion {
  @Prop({
    type: Types.ObjectId,
    ref: MockTest.name,
    required: true,
    immutable: true,
  })
  mockTestId: Types.ObjectId;

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
    type: [MockTestSectionSchema],
    required: true,
    immutable: true,
  })
  sections: MockTestSection[];

  @Prop({
    type: [MockTestVersionQuestionSchema],
    required: true,
    immutable: true,
    validate: {
      validator: (questions: MockTestVersionQuestion[]) => {
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
  questions: MockTestVersionQuestion[];

  @Prop({
    required: true,
    default: () => new Date(),
    immutable: true,
  })
  publishedAt: Date;

  createdAt: Date;
}

export const MockTestVersionSchema =
  SchemaFactory.createForClass(MockTestVersion);

MockTestVersionSchema.index({ mockTestId: 1, version: 1 }, { unique: true });
MockTestVersionSchema.index({ mockTestId: 1, publishedAt: -1 });
MockTestVersionSchema.index({ 'questions.questionVersionId': 1 });

protectImmutableHistory(MockTestVersionSchema, MockTestVersion.name);
