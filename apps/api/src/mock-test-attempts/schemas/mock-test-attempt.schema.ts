import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import {
  CognitiveDomain,
  COGNITIVE_DOMAINS,
} from '../../common/enums/cognitive-domain.enum.js';
import {
  MockTestAttemptStatus,
  MOCK_TEST_ATTEMPT_STATUSES,
} from '../../common/enums/mock-test-attempt-status.enum.js';
import { MockTestVersion } from '../../mock-tests/schemas/mock-test-version.schema.js';
import { MockTest } from '../../mock-tests/schemas/mock-test.schema.js';
import { Question } from '../../questions/schemas/question.schema.js';
import { StudentProfile } from '../../students/schemas/student-profile.schema.js';

export type MockTestAttemptDocument = HydratedDocument<MockTestAttempt>;

@Schema({ _id: false })
export class MockTestAttemptAnswer {
  @Prop({
    type: Types.ObjectId,
    ref: Question.name,
    required: true,
  })
  questionId: Types.ObjectId;

  @Prop({
    type: [String],
    default: undefined,
    validate: {
      validator: (ids: string[] | undefined) =>
        ids === undefined || new Set(ids).size === ids.length,
      message: 'selectedOptionIds must not contain duplicates',
    },
  })
  selectedOptionIds?: string[];

  @Prop({
    trim: true,
    maxlength: 10000,
  })
  responseText?: string;

  @Prop()
  isCorrect?: boolean;

  @Prop({
    default: 0,
    min: 0,
  })
  marksAwarded: number;

  @Prop()
  answeredAt?: Date;
}

export const MockTestAttemptAnswerSchema = SchemaFactory.createForClass(
  MockTestAttemptAnswer,
);

@Schema({ _id: false })
export class MockTestAttemptSectionScore {
  @Prop({
    type: String,
    enum: COGNITIVE_DOMAINS,
    required: true,
  })
  cognitiveDomain: CognitiveDomain;

  @Prop({
    default: 0,
    min: 0,
  })
  score: number;

  @Prop({
    required: true,
    min: 0,
  })
  maxScore: number;
}

export const MockTestAttemptSectionScoreSchema = SchemaFactory.createForClass(
  MockTestAttemptSectionScore,
);

/**
 * Practice sitting for a mock test. Multiple attempts per student are allowed.
 * Answers and evaluated scores are embedded to preserve historical results.
 */
@Schema({
  timestamps: true,
  collection: 'mock_test_attempts',
})
export class MockTestAttempt {
  @Prop({
    type: Types.ObjectId,
    ref: StudentProfile.name,
    required: true,
  })
  studentId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: MockTest.name,
    required: true,
  })
  mockTestId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: MockTestVersion.name,
    required: true,
    index: true,
  })
  mockTestVersionId: Types.ObjectId;

  @Prop({
    type: String,
    enum: MOCK_TEST_ATTEMPT_STATUSES,
    default: MockTestAttemptStatus.NOT_STARTED,
  })
  status: MockTestAttemptStatus;

  @Prop({
    type: [MockTestAttemptAnswerSchema],
    default: [],
    validate: {
      validator: (answers: MockTestAttemptAnswer[]) => {
        const questionIds = answers.map((answer) =>
          answer.questionId.toString(),
        );
        return new Set(questionIds).size === questionIds.length;
      },
      message: 'answers must not contain duplicate question references',
    },
  })
  answers: MockTestAttemptAnswer[];

  @Prop({
    type: [MockTestAttemptSectionScoreSchema],
    default: [],
    validate: {
      validator: (scores: MockTestAttemptSectionScore[]) => {
        const domains = scores.map((score) => score.cognitiveDomain);
        return new Set(domains).size === domains.length;
      },
      message: 'sectionScores must not contain duplicate cognitive domains',
    },
  })
  sectionScores: MockTestAttemptSectionScore[];

  @Prop({
    default: 0,
    min: 0,
  })
  totalScore: number;

  @Prop({
    required: true,
    min: 0,
  })
  totalMarks: number;

  @Prop()
  startedAt?: Date;

  @Prop()
  submittedAt?: Date;

  @Prop()
  evaluatedAt?: Date;
}

export const MockTestAttemptSchema =
  SchemaFactory.createForClass(MockTestAttempt);

MockTestAttemptSchema.index({ mockTestId: 1, status: 1 });
MockTestAttemptSchema.index({ mockTestVersionId: 1, status: 1 });
MockTestAttemptSchema.index({ studentId: 1, status: 1 });
MockTestAttemptSchema.index({ status: 1, createdAt: -1 });
MockTestAttemptSchema.index({ studentId: 1, mockTestId: 1 });
