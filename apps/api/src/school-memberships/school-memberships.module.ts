import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  SchoolMembership,
  SchoolMembershipSchema,
} from './schemas/school-membership.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SchoolMembership.name, schema: SchoolMembershipSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class SchoolMembershipsModule {}
