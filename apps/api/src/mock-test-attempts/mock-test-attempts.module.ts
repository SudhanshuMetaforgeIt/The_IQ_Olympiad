import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  MockTestAttempt,
  MockTestAttemptSchema,
} from './schemas/mock-test-attempt.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MockTestAttempt.name, schema: MockTestAttemptSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MockTestAttemptsModule {}
