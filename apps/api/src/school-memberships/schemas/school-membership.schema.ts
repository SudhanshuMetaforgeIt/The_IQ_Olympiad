import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import {
  SchoolMembershipRole,
  SCHOOL_MEMBERSHIP_ROLES,
} from '../../common/enums/school-membership-role.enum.js';
import {
  SchoolMembershipStatus,
  SCHOOL_MEMBERSHIP_STATUSES,
} from '../../common/enums/school-membership-status.enum.js';
import { School } from '../../schools/schemas/school.schema.js';
import { User } from '../../users/schemas/user.schema.js';

export type SchoolMembershipDocument = HydratedDocument<SchoolMembership>;

/**
 * School-scoped authorization membership. Global identity roles remain on User.
 */
@Schema({
  timestamps: true,
  collection: 'school_memberships',
})
export class SchoolMembership {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: School.name,
    required: true,
  })
  schoolId: Types.ObjectId;

  @Prop({
    type: String,
    enum: SCHOOL_MEMBERSHIP_ROLES,
    required: true,
  })
  role: SchoolMembershipRole;

  @Prop({
    type: String,
    enum: SCHOOL_MEMBERSHIP_STATUSES,
    default: SchoolMembershipStatus.ACTIVE,
  })
  status: SchoolMembershipStatus;
}

export const SchoolMembershipSchema =
  SchemaFactory.createForClass(SchoolMembership);

SchoolMembershipSchema.index({ userId: 1, schoolId: 1 }, { unique: true });
SchoolMembershipSchema.index({ schoolId: 1, status: 1 });
SchoolMembershipSchema.index({ userId: 1, status: 1 });
SchoolMembershipSchema.index({ role: 1, status: 1 });
