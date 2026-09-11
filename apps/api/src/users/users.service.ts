import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserRole } from '../common/enums/user-role.enum.js';
import { PasswordService } from '../common/services/password.service.js';
import { User, type UserDocument } from './schemas/user.schema.js';

export type CreateUserInput = {
  email: string;
  password: string;
  name: string;
  roles: UserRole[];
  phone?: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(input: CreateUserInput): Promise<UserDocument> {
    const email = input.email.trim().toLowerCase();
    const existing = await this.userModel.exists({ email });
    if (existing) {
      throw new ConflictException('Email is already registered');
    }

    if (input.phone) {
      const phoneTaken = await this.userModel.exists({ phone: input.phone });
      if (phoneTaken) {
        throw new ConflictException('Phone number is already registered');
      }
    }

    const passwordHash = await this.passwordService.hash(input.password);

    const skipVerification = process.env.NODE_ENV !== 'production';

    return this.userModel.create({
      email,
      passwordHash,
      name: input.name.trim(),
      roles: input.roles,
      phone: input.phone,
      isEmailVerified: skipVerification,
      isPhoneVerified: skipVerification,
    });
  }

  async findByEmail(
    email: string,
    withPassword = false,
  ): Promise<UserDocument | null> {
    const query = this.userModel.findOne({
      email: email.trim().toLowerCase(),
    });
    if (withPassword) {
      query.select('+passwordHash');
    }
    return query.exec();
  }

  async findByPhone(
    phone: string,
    withPassword = false,
  ): Promise<UserDocument | null> {
    const query = this.userModel.findOne({ phone });
    if (withPassword) {
      query.select('+passwordHash');
    }
    return query.exec();
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByIdWithPassword(id: string): Promise<UserDocument> {
    const user = await this.userModel
      .findById(id)
      .select('+passwordHash')
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async markLogin(userId: string): Promise<void> {
    await this.userModel
      .updateOne({ _id: userId }, { $set: { lastLoginAt: new Date() } })
      .exec();
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const passwordHash = await this.passwordService.hash(newPassword);
    await this.userModel
      .updateOne({ _id: userId }, { $set: { passwordHash } })
      .exec();
  }

  async markPhoneVerified(userId: string): Promise<void> {
    await this.userModel
      .updateOne({ _id: userId }, { $set: { isPhoneVerified: true } })
      .exec();
  }

  async markEmailVerified(userId: string): Promise<void> {
    await this.userModel
      .updateOne({ _id: userId }, { $set: { isEmailVerified: true } })
      .exec();
  }

  async deleteById(userId: string): Promise<void> {
    await this.userModel.deleteOne({ _id: userId }).exec();
  }
}
