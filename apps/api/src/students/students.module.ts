import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { School, SchoolSchema } from '../schools/schemas/school.schema.js';
import { UsersModule } from '../users/users.module.js';
import {
  StudentProfile,
  StudentProfileSchema,
} from './schemas/student-profile.schema.js';
import { StudentsController } from './students.controller.js';
import { StudentsService } from './students.service.js';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: StudentProfile.name, schema: StudentProfileSchema },
      { name: School.name, schema: SchoolSchema },
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [MongooseModule, StudentsService],
})
export class StudentsModule {}
