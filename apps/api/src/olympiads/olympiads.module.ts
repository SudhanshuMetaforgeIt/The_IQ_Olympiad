import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Olympiad, OlympiadSchema } from './schemas/olympiad.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Olympiad.name, schema: OlympiadSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class OlympiadsModule {}
