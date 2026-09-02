import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import {
  CognitiveDomain,
  COGNITIVE_DOMAINS,
} from '../../common/enums/cognitive-domain.enum.js';
import {
  ExamStatus,
  EXAM_STATUSES,
} from '../../common/enums/exam-status.enum.js';
import { Olympiad } from '../../olympiads/schemas/olympiad.schema.js';
import { Question } from '../../questions/schemas/question.schema.js';

export type ExamDocument = HydratedDocument<Exam>;

@Schema({ _id: false })
export class ExamSection {
  @Prop({
    type: String,
    enum: COGNITIVE_DOMAINS,
    required: true,
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
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'section marks must be a positive integer',
    },
  })
  marks: number;

  @Prop({
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'section questionCount must be a positive integer',
    },
  })
  questionCount: number;
}

export const ExamSectionSchema = SchemaFactory.createForClass(ExamSection);

@Schema({ _id: false })
export class ExamQuestion {
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
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'question order must be a positive integer',
    },
  })
  order: number;
}

export const ExamQuestionSchema = SchemaFactory.createForClass(ExamQuestion);

/**
 * Official olympiad exam configuration.
 * Stores Question references and exam-specific marks/order — not full question payloads.
 */
@Schema({
  timestamps: true,
  collection: 'exams',
})
export class Exam {
  @Prop({
    type: Types.ObjectId,
    ref: Olympiad.name,
    required: true,
    index: true,
  })
  olympiadId: Types.ObjectId;

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
    type: [ExamSectionSchema],
    default: [],
  })
  sections: ExamSection[];

  @Prop({
    type: [ExamQuestionSchema],
    default: [],
    validate: {
      validator: (questions: ExamQuestion[]) => {
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
  questions: ExamQuestion[];

  @Prop({
    required: true,
    index: true,
  })
  startsAt: Date;

  @Prop({
    required: true,
    index: true,
    validate: {
      validator: function (this: Exam, value: Date) {
        return this.startsAt instanceof Date && value > this.startsAt;
      },
      message: 'endsAt must be after startsAt',
    },
  })
  endsAt: Date;

  @Prop({
    type: String,
    enum: EXAM_STATUSES,
    default: ExamStatus.DRAFT,
    index: true,
  })
  status: ExamStatus;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);

ExamSchema.index({ olympiadId: 1, status: 1 });
ExamSchema.index({ status: 1, startsAt: 1, endsAt: 1 });
ExamSchema.index({ createdAt: -1 });
