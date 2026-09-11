import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import {
  OlympiadRegistrationStatus,
  OLYMPIAD_REGISTRATION_STATUSES,
} from '../../common/enums/olympiad-registration-status.enum.js';
import { Olympiad } from '../../olympiads/schemas/olympiad.schema.js';
import { StudentProfile } from '../../students/schemas/student-profile.schema.js';

export type OlympiadRegistrationDocument =
  HydratedDocument<OlympiadRegistration>;

/**
 * Student enrollment for a yearly olympiad cycle.
 * Payments are modeled separately and will reference this registration.
 */
@Schema({
  timestamps: true,
  collection: 'olympiad_registrations',
})
export class OlympiadRegistration {
  @Prop({
    type: Types.ObjectId,
    ref: StudentProfile.name,
    required: true,
  })
  studentId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Olympiad.name,
    required: true,
  })
  olympiadId: Types.ObjectId;

  @Prop({
    type: String,
    enum: OLYMPIAD_REGISTRATION_STATUSES,
    default: OlympiadRegistrationStatus.PENDING,
  })
  status: OlympiadRegistrationStatus;

  @Prop({
    default: () => new Date(),
  })
  registeredAt: Date;

  @Prop()
  confirmedAt?: Date;

  @Prop()
  cancelledAt?: Date;

  @Prop({
    trim: true,
    maxlength: 1000,
  })
  rejectionReason?: string;
}

export const OlympiadRegistrationSchema =
  SchemaFactory.createForClass(OlympiadRegistration);

OlympiadRegistrationSchema.index(
  { studentId: 1, olympiadId: 1 },
  { unique: true },
);
OlympiadRegistrationSchema.index({ olympiadId: 1, status: 1 });
OlympiadRegistrationSchema.index({ studentId: 1, status: 1 });
OlympiadRegistrationSchema.index({ status: 1, createdAt: -1 });
