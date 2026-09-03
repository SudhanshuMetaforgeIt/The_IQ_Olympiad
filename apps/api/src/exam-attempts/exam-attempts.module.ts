import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ExamsModule } from '../exams/exams.module.js';
import { OlympiadsModule } from '../olympiads/olympiads.module.js';
import { QuestionsModule } from '../questions/questions.module.js';
import { RegistrationsModule } from '../registrations/registrations.module.js';
import { StudentsModule } from '../students/students.module.js';
import { ExamAttemptsController } from './exam-attempts.controller.js';
import { ExamAttemptsService } from './exam-attempts.service.js';
import {
  ExamAttempt,
  ExamAttemptSchema,
} from './schemas/exam-attempt.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamAttempt.name, schema: ExamAttemptSchema },
    ]),
    StudentsModule,
    ExamsModule,
    QuestionsModule,
    RegistrationsModule,
    OlympiadsModule,
  ],
  controllers: [ExamAttemptsController],
  providers: [ExamAttemptsService],
  exports: [MongooseModule, ExamAttemptsService],
})
export class ExamAttemptsModule {}
