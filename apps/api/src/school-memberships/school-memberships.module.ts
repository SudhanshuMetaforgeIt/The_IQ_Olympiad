import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  SchoolMembership,
  SchoolMembershipSchema,
} from './schemas/school-membership.schema.js';
import { SchoolMembershipsService } from './school-memberships.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SchoolMembership.name, schema: SchoolMembershipSchema },
    ]),
  ],
  providers: [SchoolMembershipsService],
  exports: [MongooseModule, SchoolMembershipsService],
})
export class SchoolMembershipsModule {}
