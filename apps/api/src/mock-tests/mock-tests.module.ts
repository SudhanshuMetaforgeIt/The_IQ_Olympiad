import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QuestionsModule } from '../questions/questions.module.js';
import { MockTestsController } from './mock-tests.controller.js';
import { MockTestsService } from './mock-tests.service.js';
import {
  MockTestVersion,
  MockTestVersionSchema,
} from './schemas/mock-test-version.schema.js';
import { MockTest, MockTestSchema } from './schemas/mock-test.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MockTest.name, schema: MockTestSchema },
      { name: MockTestVersion.name, schema: MockTestVersionSchema },
    ]),
    QuestionsModule,
  ],
  controllers: [MockTestsController],
  providers: [MockTestsService],
  exports: [MongooseModule, MockTestsService],
})
export class MockTestsModule {}
