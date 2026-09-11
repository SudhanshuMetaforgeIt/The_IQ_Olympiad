import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import {
  CognitiveDomain,
  COGNITIVE_DOMAINS,
} from '../../common/enums/cognitive-domain.enum.js';
import {
  MockTestStatus,
  MOCK_TEST_STATUSES,
} from '../../common/enums/mock-test-status.enum.js';
import { Question } from '../../questions/schemas/question.schema.js';

export type MockTestDocument = HydratedDocument<MockTest>;

@Schema({ _id: false })
export class MockTestSection {
  @Prop({
    type: String,
    enum: COGNITIVE_DOMAINS,
    required: true,
    index: true,
  })
  cognitiveDomain: CognitiveDomain;

  @Prop({
    required: true,
    trim: true,
    maxlength: 200,
  })
  title: string;

  @Prop({
    trim: true,
    maxlength: 2000,
  })
  instructions?: string;

  @Prop({
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: 'section marks must be a non-negative integer',
    },
  })
  marks: number;

  @Prop({
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'questionCount must be a positive integer',
    },
  })
  questionCount: number;
}

export const MockTestSectionSchema =
  SchemaFactory.createForClass(MockTestSection);

@Schema({ _id: false })
export class MockTestQuestion {
  @Prop({
    type: Types.ObjectId,
    ref: Question.name,
    required: true,
  })
  questionId: Types.ObjectId;

  @Prop({
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'question marks must be a positive integer',
    },
  })
  marks: number;

  @Prop({
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: 'question order must be a non-negative integer',
    },
  })
  order: number;
}

export const MockTestQuestionSchema =
  SchemaFactory.createForClass(MockTestQuestion);

/**
 * Independent practice assessment from the Question Bank.
 * No olympiad registration required — attempts and entitlements are separate domains.
 */
@Schema({
  timestamps: true,
  collection: 'mock_tests',
})
export class MockTest {
  @Prop({
    required: true,
    trim: true,
    maxlength: 200,
  })
  title: string;

  @Prop({
    trim: true,
    maxlength: 2000,
  })
  description?: string;

  @Prop({
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'durationMinutes must be a positive integer',
    },
  })
  durationMinutes: number;

  @Prop({
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'totalMarks must be a positive integer',
    },
  })
  totalMarks: number;

  @Prop({
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'totalQuestions must be a positive integer',
    },
  })
  totalQuestions: number;

  @Prop({
    type: [MockTestSectionSchema],
    default: [],
  })
  sections: MockTestSection[];

  @Prop({
    type: [MockTestQuestionSchema],
    default: [],
    validate: {
      validator: (questions: MockTestQuestion[]) => {
        const questionIds = questions.map((question) =>
          question.questionId.toString(),
        );
        const orders = questions.map((question) => question.order);
        return (
          new Set(questionIds).size === questionIds.length &&
          new Set(orders).size === orders.length
        );
      },
      message:
        'questions must not contain duplicate references or order values',
    },
  })
  questions: MockTestQuestion[];

  @Prop({
    type: String,
    enum: MOCK_TEST_STATUSES,
    default: MockTestStatus.DRAFT,
    index: true,
  })
  status: MockTestStatus;
}

export const MockTestSchema = SchemaFactory.createForClass(MockTest);

MockTestSchema.index({ status: 1, createdAt: -1 });
MockTestSchema.index({ 'sections.cognitiveDomain': 1 });
