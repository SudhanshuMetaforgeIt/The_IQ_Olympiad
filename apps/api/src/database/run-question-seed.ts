import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import { AppModule } from '../app.module.js';
import {
  Question,
  type QuestionDocument,
} from '../questions/schemas/question.schema.js';
import { seedQuestions } from './dababase.seed.js';

/**
 * Bootstraps the existing NestJS AppModule (and its Mongoose connection),
 * then runs the curated demo question seed.
 *
 * Run from apps/api:
 *   npm run seed:questions
 */
async function run() {
  const logger = new Logger('QuestionSeed');
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  try {
    const questionModel = app.get<Model<QuestionDocument>>(
      getModelToken(Question.name),
    );

    await seedQuestions(questionModel);
  } catch (error) {
    logger.error('Question seed failed', error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

await run();
