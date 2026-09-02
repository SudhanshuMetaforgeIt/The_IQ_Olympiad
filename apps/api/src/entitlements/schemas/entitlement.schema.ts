import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import {
  EntitlementSourceType,
  ENTITLEMENT_SOURCE_TYPES,
} from '../../common/enums/entitlement-source-type.enum.js';
import {
  EntitlementStatus,
  ENTITLEMENT_STATUSES,
} from '../../common/enums/entitlement-status.enum.js';
import {
  EntitlementType,
  ENTITLEMENT_TYPES,
} from '../../common/enums/entitlement-type.enum.js';
import { StudentProfile } from '../../students/schemas/student-profile.schema.js';

export type EntitlementDocument = HydratedDocument<Entitlement>;

/**
 * What a student is allowed to consume (e.g. free/paid mock attempts, premium).
 * Consumption and grant workflows are handled outside this schema.
 */
@Schema({
  timestamps: true,
  collection: 'entitlements',
})
export class Entitlement {
  @Prop({
    type: Types.ObjectId,
    ref: StudentProfile.name,
    required: true,
  })
  studentId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ENTITLEMENT_TYPES,
    required: true,
  })
  type: EntitlementType;

  @Prop({
    type: String,
    enum: ENTITLEMENT_STATUSES,
    default: EntitlementStatus.ACTIVE,
  })
  status: EntitlementStatus;

  @Prop({
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: 'quantityGranted must be a non-negative integer',
    },
  })
  quantityGranted: number;

  @Prop({
    default: 0,
    min: 0,
    validate: {
      validator: function (this: Entitlement, value: number) {
        return Number.isInteger(value) && value <= this.quantityGranted;
      },
      message:
        'quantityUsed must be an integer and cannot exceed quantityGranted',
    },
  })
  quantityUsed: number;

  @Prop({
    type: String,
    enum: ENTITLEMENT_SOURCE_TYPES,
    required: true,
  })
  sourceType: EntitlementSourceType;

  @Prop({
    type: Types.ObjectId,
  })
  sourceId?: Types.ObjectId;

  @Prop({
    trim: true,
    maxlength: 500,
  })
  description?: string;

  @Prop({
    default: () => new Date(),
  })
  startsAt: Date;

  @Prop({
    validate: {
      validator: function (this: Entitlement, value: Date | undefined) {
        return value === undefined || value > this.startsAt;
      },
      message: 'expiresAt must be after startsAt',
    },
  })
  expiresAt?: Date;
}

export const EntitlementSchema = SchemaFactory.createForClass(Entitlement);

EntitlementSchema.index({ studentId: 1, type: 1, status: 1 });
EntitlementSchema.index({ studentId: 1, status: 1 });
EntitlementSchema.index({ type: 1, status: 1 });
EntitlementSchema.index({ expiresAt: 1 });
EntitlementSchema.index({ sourceType: 1, sourceId: 1, studentId: 1 });
EntitlementSchema.index(
  { studentId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      type: EntitlementType.FREE_MOCK_TEST_ATTEMPTS,
      sourceType: EntitlementSourceType.SYSTEM,
    },
  },
);
EntitlementSchema.index(
  { sourceType: 1, sourceId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      sourceType: EntitlementSourceType.PAYMENT,
      sourceId: { $type: 'objectId' },
    },
  },
);
