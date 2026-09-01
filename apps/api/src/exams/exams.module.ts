import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ExamVersion,
  ExamVersionSchema,
} from './schemas/exam-version.schema.js';
import { Exam, ExamSchema } from './schemas/exam.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exam.name, schema: ExamSchema },
      { name: ExamVersion.name, schema: ExamVersionSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class ExamsModule {}
