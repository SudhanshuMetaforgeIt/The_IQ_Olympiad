import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { SchoolMembershipRole } from '../common/enums/school-membership-role.enum.js';
import { SchoolMembershipStatus } from '../common/enums/school-membership-status.enum.js';
import {
  SchoolMembership,
  type SchoolMembershipDocument,
} from './schemas/school-membership.schema.js';

@Injectable()
export class SchoolMembershipsService {
  constructor(
    @InjectModel(SchoolMembership.name)
    private readonly membershipModel: Model<SchoolMembershipDocument>,
  ) {}

  async createAdminMembership(
    userId: Types.ObjectId | string,
    schoolId: Types.ObjectId | string,
  ): Promise<SchoolMembershipDocument> {
    return this.membershipModel.create({
      userId,
      schoolId,
      role: SchoolMembershipRole.SCHOOL_ADMIN,
      status: SchoolMembershipStatus.ACTIVE,
    });
  }

  async findActiveByUser(
    userId: string,
  ): Promise<SchoolMembershipDocument[]> {
    return this.membershipModel
      .find({
        userId,
        status: SchoolMembershipStatus.ACTIVE,
      })
      .exec();
  }

  async findActiveMembership(
    userId: string,
    schoolId: string,
  ): Promise<SchoolMembershipDocument | null> {
    return this.membershipModel
      .findOne({
        userId,
        schoolId,
        status: SchoolMembershipStatus.ACTIVE,
      })
      .exec();
  }

  async assertActiveMembership(
    userId: string,
    schoolId: string,
  ): Promise<SchoolMembershipDocument> {
    const membership = await this.findActiveMembership(userId, schoolId);
    if (!membership) {
      throw new ForbiddenException('You do not have access to this school');
    }
    return membership;
  }

  async listBySchoolId(
    schoolId: string,
    page: number,
    limit: number,
  ): Promise<{ items: SchoolMembershipDocument[]; total: number }> {
    if (!Types.ObjectId.isValid(schoolId)) {
      throw new NotFoundException('School not found');
    }

    const filter = { schoolId };
    const [items, total] = await Promise.all([
      this.membershipModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.membershipModel.countDocuments(filter).exec(),
    ]);

    return { items, total };
  }
}
