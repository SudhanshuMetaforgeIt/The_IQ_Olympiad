import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QuestionsController } from './questions.controller.js';
import { QuestionsService } from './questions.service.js';
import {
  QuestionVersion,
  QuestionVersionSchema,
} from './schemas/question-version.schema.js';
import { Question, QuestionSchema } from './schemas/question.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: QuestionVersion.name, schema: QuestionVersionSchema },
    ]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [MongooseModule, QuestionsService],
})
export class QuestionsModule {}
