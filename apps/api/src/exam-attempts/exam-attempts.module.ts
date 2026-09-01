import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ExamAttempt,
  ExamAttemptSchema,
} from './schemas/exam-attempt.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamAttempt.name, schema: ExamAttemptSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class ExamAttemptsModule {}
