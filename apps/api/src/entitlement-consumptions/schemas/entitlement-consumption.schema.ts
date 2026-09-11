import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

import { protectImmutableHistory } from '../../common/mongoose/protect-immutable-history.js';
import { Entitlement } from '../../entitlements/schemas/entitlement.schema.js';
import { MockTestAttempt } from '../../mock-test-attempts/schemas/mock-test-attempt.schema.js';
import { StudentProfile } from '../../students/schemas/student-profile.schema.js';

const MAX_METADATA_BYTES = 16 * 1024;

export type EntitlementConsumptionDocument =
  HydratedDocument<EntitlementConsumption>;

/**
 * Append-only record of entitlement usage. Atomic availability checks and
 * quantityUsed increments belong in a future transaction-based service.
 */
@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'entitlement_consumptions',
})
export class EntitlementConsumption {
  @Prop({
    type: Types.ObjectId,
    ref: Entitlement.name,
    required: true,
    immutable: true,
  })
  entitlementId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: StudentProfile.name,
    required: true,
    immutable: true,
  })
  studentId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: MockTestAttempt.name,
    immutable: true,
  })
  mockTestAttemptId?: Types.ObjectId;

  @Prop({
    required: true,
    min: 1,
    immutable: true,
    validate: {
      validator: Number.isInteger,
      message: 'quantity must be a positive integer',
    },
  })
  quantity: number;

  @Prop({
    default: () => new Date(),
    immutable: true,
  })
  consumedAt: Date;

  @Prop({
    trim: true,
    maxlength: 120,
    immutable: true,
  })
  idempotencyKey?: string;

  @Prop({
    type: SchemaTypes.Mixed,
    immutable: true,
    validate: {
      validator: (metadata: Record<string, unknown> | undefined) =>
        metadata === undefined ||
        Buffer.byteLength(JSON.stringify(metadata), 'utf8') <=
          MAX_METADATA_BYTES,
      message: 'metadata must not exceed 16 KiB',
    },
  })
  metadata?: Record<string, unknown>;
}

export const EntitlementConsumptionSchema = SchemaFactory.createForClass(
  EntitlementConsumption,
);

EntitlementConsumptionSchema.index({ entitlementId: 1, consumedAt: -1 });
EntitlementConsumptionSchema.index({ studentId: 1, consumedAt: -1 });
EntitlementConsumptionSchema.index({ mockTestAttemptId: 1 });
EntitlementConsumptionSchema.index(
  { entitlementId: 1, mockTestAttemptId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      mockTestAttemptId: { $type: 'objectId' },
    },
  },
);
EntitlementConsumptionSchema.index(
  { idempotencyKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      idempotencyKey: { $type: 'string' },
    },
  },
);

protectImmutableHistory(
  EntitlementConsumptionSchema,
  EntitlementConsumption.name,
);
