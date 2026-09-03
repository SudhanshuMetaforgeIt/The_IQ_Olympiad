import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SchoolMembershipsModule } from '../school-memberships/school-memberships.module.js';
import { StudentsModule } from '../students/students.module.js';
import { School, SchoolSchema } from './schemas/school.schema.js';
import { SchoolsController } from './schools.controller.js';
import { SchoolsService } from './schools.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
    SchoolMembershipsModule,
    StudentsModule,
  ],
  controllers: [SchoolsController],
  providers: [SchoolsService],
  exports: [MongooseModule, SchoolsService],
})
export class SchoolsModule {}
