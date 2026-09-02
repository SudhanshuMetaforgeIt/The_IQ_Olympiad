import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import {
  CognitiveDomain,
  COGNITIVE_DOMAINS,
} from '../../common/enums/cognitive-domain.enum.js';
import {
  ExamAttemptStatus,
  EXAM_ATTEMPT_STATUSES,
} from '../../common/enums/exam-attempt-status.enum.js';
import { ExamVersion } from '../../exams/schemas/exam-version.schema.js';
import { Exam } from '../../exams/schemas/exam.schema.js';
import { Question } from '../../questions/schemas/question.schema.js';
import { OlympiadRegistration } from '../../registrations/schemas/olympiad-registration.schema.js';
import { StudentProfile } from '../../students/schemas/student-profile.schema.js';

export type ExamAttemptDocument = HydratedDocument<ExamAttempt>;

@Schema({ _id: false })
export class ExamAttemptAnswer {
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

export const ExamAttemptAnswerSchema =
  SchemaFactory.createForClass(ExamAttemptAnswer);

@Schema({ _id: false })
export class ExamAttemptSectionScore {
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

export const ExamAttemptSectionScoreSchema = SchemaFactory.createForClass(
  ExamAttemptSectionScore,
);

/**
 * One official olympiad exam sitting per student.
 * Answers and evaluated scores are embedded to preserve historical results.
 */
@Schema({
  timestamps: true,
  collection: 'exam_attempts',
})
export class ExamAttempt {
  @Prop({
    type: Types.ObjectId,
    ref: StudentProfile.name,
    required: true,
  })
  studentId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Exam.name,
    required: true,
  })
  examId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: ExamVersion.name,
    required: true,
    index: true,
  })
  examVersionId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: OlympiadRegistration.name,
    required: true,
    index: true,
  })
  registrationId: Types.ObjectId;

  @Prop({
    type: String,
    enum: EXAM_ATTEMPT_STATUSES,
    default: ExamAttemptStatus.NOT_STARTED,
  })
  status: ExamAttemptStatus;

  @Prop({
    type: [ExamAttemptAnswerSchema],
    default: [],
    validate: {
      validator: (answers: ExamAttemptAnswer[]) => {
        const questionIds = answers.map((answer) =>
          answer.questionId.toString(),
        );
        return new Set(questionIds).size === questionIds.length;
      },
      message: 'answers must not contain duplicate question references',
    },
  })
  answers: ExamAttemptAnswer[];

  @Prop({
    type: [ExamAttemptSectionScoreSchema],
    default: [],
    validate: {
      validator: (scores: ExamAttemptSectionScore[]) => {
        const domains = scores.map((score) => score.cognitiveDomain);
        return new Set(domains).size === domains.length;
      },
      message: 'sectionScores must not contain duplicate cognitive domains',
    },
  })
  sectionScores: ExamAttemptSectionScore[];

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

export const ExamAttemptSchema = SchemaFactory.createForClass(ExamAttempt);

ExamAttemptSchema.index({ studentId: 1, examId: 1 }, { unique: true });
ExamAttemptSchema.index({ examVersionId: 1, status: 1 });
ExamAttemptSchema.index({ examId: 1, status: 1 });
ExamAttemptSchema.index({ studentId: 1, status: 1 });
ExamAttemptSchema.index({ status: 1, createdAt: -1 });
