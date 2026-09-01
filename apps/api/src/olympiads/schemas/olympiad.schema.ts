import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import {
  OlympiadStatus,
  OLYMPIAD_STATUSES,
} from '../../common/enums/olympiad-status.enum.js';
import {
  StudentClass,
  STUDENT_CLASSES,
} from '../../common/enums/student-class.enum.js';

export type OlympiadDocument = HydratedDocument<Olympiad>;

/**
 * Yearly official competition cycle (e.g. academic year 2026-27).
 * Mock/practice tests, exams, payments, and registrations are separate domains.
 */
@Schema({
  timestamps: true,
  collection: 'olympiads',
})
export class Olympiad {
  @Prop({
    required: true,
    trim: true,
    maxlength: 200,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    minlength: 4,
    maxlength: 40,
    match: /^[A-Z0-9-]+$/,
  })
  code: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 120,
    match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  })
  slug: string;

  @Prop({
    trim: true,
    maxlength: 2000,
  })
  description?: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    match: /^\d{4}-\d{2}$/,
  })
  academicYear: string;

  @Prop({
    type: [String],
    enum: STUDENT_CLASSES,
    required: true,
    validate: {
      validator: (classes: StudentClass[]) =>
        Array.isArray(classes) && classes.length > 0,
      message: 'At least one eligible class (7–12) is required',
    },
  })
  eligibleClasses: StudentClass[];

  @Prop({
    required: true,
  })
  registrationStartsAt: Date;

  @Prop({
    required: true,
    validate: {
      validator: function (this: Olympiad, value: Date) {
        return (
          this.registrationStartsAt instanceof Date &&
          value > this.registrationStartsAt
        );
      },
      message: 'registrationEndsAt must be after registrationStartsAt',
    },
  })
  registrationEndsAt: Date;

  @Prop({
    type: String,
    enum: OLYMPIAD_STATUSES,
    default: OlympiadStatus.DRAFT,
    index: true,
  })
  status: OlympiadStatus;
}

export const OlympiadSchema = SchemaFactory.createForClass(Olympiad);

OlympiadSchema.index({ status: 1, academicYear: -1 });
OlympiadSchema.index({ status: 1, registrationStartsAt: 1, registrationEndsAt: 1 });
OlympiadSchema.index({ eligibleClasses: 1 });
OlympiadSchema.index({ createdAt: -1 });
