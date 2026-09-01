import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import {
  SchoolStatus,
  SCHOOL_STATUSES,
} from '../../common/enums/school-status.enum.js';
import {
  SchoolType,
  SCHOOL_TYPES,
} from '../../common/enums/school-type.enum.js';

export type SchoolDocument = HydratedDocument<School>;

@Schema({ _id: false })
export class SchoolAddress {
  @Prop({ required: true, trim: true, maxlength: 100 })
  city: string;

  @Prop({ trim: true, maxlength: 100 })
  state?: string;

  @Prop({ trim: true, maxlength: 200 })
  line1?: string;

  @Prop({ trim: true, maxlength: 200 })
  line2?: string;

  @Prop({
    trim: true,
    match: /^\d{6}$/,
  })
  pincode?: string;

  @Prop({ trim: true, maxlength: 100, default: 'India' })
  country?: string;
}

export const SchoolAddressSchema = SchemaFactory.createForClass(SchoolAddress);

/**
 * Educational institution on the platform.
 * Students and admins are linked via references on other collections — not embedded here.
 */
@Schema({
  timestamps: true,
  collection: 'schools',
})
export class School {
  @Prop({
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    minlength: 6,
    maxlength: 20,
    match: /^[A-Z0-9-]+$/,
  })
  code: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: 200,
  })
  name: string;

  @Prop({
    trim: true,
    maxlength: 120,
  })
  branch?: string;

  @Prop({
    required: true,
    lowercase: true,
    trim: true,
    maxlength: 255,
  })
  email: string;

  @Prop({
    trim: true,
    match: /^[6-9]\d{9}$/,
  })
  phone?: string;

  @Prop({
    type: SchoolAddressSchema,
    required: true,
  })
  address: SchoolAddress;

  @Prop({
    type: [String],
    enum: SCHOOL_TYPES,
    default: [],
  })
  schoolTypes: SchoolType[];

  @Prop({
    type: [Number],
    default: [],
    validate: {
      validator: (classes: number[]) =>
        classes.every((cls) => Number.isInteger(cls) && cls >= 1 && cls <= 12),
      message: 'managedClasses must contain integers between 1 and 12',
    },
  })
  managedClasses: number[];

  @Prop({
    type: String,
    enum: SCHOOL_STATUSES,
    default: SchoolStatus.PENDING,
    index: true,
  })
  status: SchoolStatus;
}

export const SchoolSchema = SchemaFactory.createForClass(School);

SchoolSchema.index({ name: 1, 'address.city': 1 });
SchoolSchema.index({ status: 1, createdAt: -1 });
SchoolSchema.index({ email: 1 });
