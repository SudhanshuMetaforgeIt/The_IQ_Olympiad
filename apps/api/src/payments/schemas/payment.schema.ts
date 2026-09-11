import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

import {
  PaymentProvider,
  PAYMENT_PROVIDERS,
} from '../../common/enums/payment-provider.enum.js';
import {
  PaymentPurpose,
  PAYMENT_PURPOSES,
} from '../../common/enums/payment-purpose.enum.js';
import {
  PaymentStatus,
  PAYMENT_STATUSES,
} from '../../common/enums/payment-status.enum.js';
import { User } from '../../users/schemas/user.schema.js';

export type PaymentDocument = HydratedDocument<Payment>;

/**
 * Generic payment/transaction record.
 * Links to product entities via polymorphic referenceType + referenceId
 * (e.g. OlympiadRegistration, MockTestAttempt) without hard collection coupling.
 */
@Schema({
  timestamps: true,
  collection: 'payments',
})
export class Payment {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: String,
    enum: PAYMENT_PURPOSES,
    required: true,
  })
  purpose: PaymentPurpose;

  @Prop({
    required: true,
    min: 0,
  })
  amount: number;

  @Prop({
    required: true,
    uppercase: true,
    trim: true,
    default: 'INR',
    maxlength: 3,
    minlength: 3,
  })
  currency: string;

  @Prop({
    type: String,
    enum: PAYMENT_STATUSES,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Prop({
    type: String,
    enum: PAYMENT_PROVIDERS,
  })
  provider?: PaymentProvider;

  @Prop({
    trim: true,
    maxlength: 120,
  })
  idempotencyKey?: string;

  @Prop({
    trim: true,
    maxlength: 120,
  })
  providerOrderId?: string;

  @Prop({
    trim: true,
    maxlength: 120,
  })
  providerPaymentId?: string;

  @Prop({
    trim: true,
    maxlength: 255,
  })
  providerSignature?: string;

  @Prop({
    trim: true,
    maxlength: 80,
  })
  referenceType?: string;

  @Prop({
    type: Types.ObjectId,
  })
  referenceId?: Types.ObjectId;

  @Prop({
    trim: true,
    maxlength: 500,
  })
  description?: string;

  @Prop({
    type: SchemaTypes.Mixed,
    default: {},
  })
  metadata?: Record<string, unknown>;

  @Prop()
  paidAt?: Date;

  @Prop()
  failedAt?: Date;

  @Prop({
    trim: true,
    maxlength: 1000,
  })
  failureReason?: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.index({ userId: 1, status: 1 });
PaymentSchema.index({ purpose: 1, status: 1 });
PaymentSchema.index({ referenceType: 1, referenceId: 1 });
PaymentSchema.index(
  { idempotencyKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      idempotencyKey: { $type: 'string' },
    },
  },
);
PaymentSchema.index(
  { provider: 1, providerOrderId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      provider: { $type: 'string' },
      providerOrderId: { $type: 'string' },
    },
  },
);
PaymentSchema.index(
  { provider: 1, providerPaymentId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      provider: { $type: 'string' },
      providerPaymentId: { $type: 'string' },
    },
  },
);
PaymentSchema.index({ status: 1, createdAt: -1 });
