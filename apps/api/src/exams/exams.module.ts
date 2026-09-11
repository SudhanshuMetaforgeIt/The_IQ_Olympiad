import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OlympiadsModule } from '../olympiads/olympiads.module.js';
import { QuestionsModule } from '../questions/questions.module.js';
import { ExamsController } from './exams.controller.js';
import { ExamsService } from './exams.service.js';
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
    OlympiadsModule,
    QuestionsModule,
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [MongooseModule, ExamsService],
})
export class ExamsModule {}
