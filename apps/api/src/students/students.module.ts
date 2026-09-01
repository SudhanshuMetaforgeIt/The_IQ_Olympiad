import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  StudentProfile,
  StudentProfileSchema,
} from './schemas/student-profile.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentProfile.name, schema: StudentProfileSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class StudentsModule {}
