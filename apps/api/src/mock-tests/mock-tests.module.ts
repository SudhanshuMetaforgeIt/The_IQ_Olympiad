import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
  ],
  exports: [MongooseModule],
})
export class MockTestsModule {}
