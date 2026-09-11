import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { UserRole, USER_ROLES } from '../../common/enums/user-role.enum.js';

export type UserDocument = HydratedDocument<User>;

/**
 * Single identity collection for authentication and RBAC.
 * Store only a password hash (never plaintext). Hashing belongs in the service layer.
 * `passwordHash` uses `select: false` so it is excluded from queries by default.
 */
@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 255,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
    maxlength: 255,
  })
  passwordHash: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: 120,
  })
  name: string;

  @Prop({
    type: [String],
    enum: USER_ROLES,
    required: true,
    validate: {
      validator: (roles: UserRole[]) =>
        Array.isArray(roles) && roles.length > 0,
      message: 'A user must have at least one role',
    },
  })
  roles: UserRole[];

  @Prop({
    trim: true,
    unique: true,
    sparse: true,
    match: /^[6-9]\d{9}$/,
  })
  phone?: string;

  @Prop({ default: true, index: true })
  isActive: boolean;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: false })
  isPhoneVerified: boolean;

  @Prop()
  lastLoginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ roles: 1 });
UserSchema.index({ isActive: 1, roles: 1 });
UserSchema.index({ createdAt: -1 });

const stripSensitiveFields = (_doc: unknown, ret: User) => {
  const safeUser = { ...ret } as Partial<User> & { __v?: number };
  delete safeUser.passwordHash;
  delete safeUser.__v;
  return safeUser;
};

UserSchema.set('toJSON', { transform: stripSensitiveFields });
UserSchema.set('toObject', { transform: stripSensitiveFields });
