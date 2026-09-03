import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EntitlementsModule } from '../entitlements/entitlements.module.js';
import { MockTestsModule } from '../mock-tests/mock-tests.module.js';
import { QuestionsModule } from '../questions/questions.module.js';
import { StudentsModule } from '../students/students.module.js';
import { MockTestAttemptsController } from './mock-test-attempts.controller.js';
import { MockTestAttemptsService } from './mock-test-attempts.service.js';
import {
  MockTestAttempt,
  MockTestAttemptSchema,
} from './schemas/mock-test-attempt.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MockTestAttempt.name, schema: MockTestAttemptSchema },
    ]),
    StudentsModule,
    MockTestsModule,
    QuestionsModule,
    EntitlementsModule,
  ],
  controllers: [MockTestAttemptsController],
  providers: [MockTestAttemptsService],
  exports: [MongooseModule, MockTestAttemptsService],
})
export class MockTestAttemptsModule {}
