import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OlympiadsModule } from '../olympiads/olympiads.module.js';
import { StudentsModule } from '../students/students.module.js';
import { RegistrationsController } from './registrations.controller.js';
import { RegistrationsService } from './registrations.service.js';
import {
  OlympiadRegistration,
  OlympiadRegistrationSchema,
} from './schemas/olympiad-registration.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OlympiadRegistration.name,
        schema: OlympiadRegistrationSchema,
      },
    ]),
    OlympiadsModule,
    StudentsModule,
  ],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
  exports: [MongooseModule, RegistrationsService],
})
export class RegistrationsModule {}
