import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentsModule } from '../students/students.module.js';
import { OlympiadsController } from './olympiads.controller.js';
import { OlympiadsService } from './olympiads.service.js';
import { Olympiad, OlympiadSchema } from './schemas/olympiad.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Olympiad.name, schema: OlympiadSchema },
    ]),
    StudentsModule,
  ],
  controllers: [OlympiadsController],
  providers: [OlympiadsService],
  exports: [MongooseModule, OlympiadsService],
})
export class OlympiadsModule {}
