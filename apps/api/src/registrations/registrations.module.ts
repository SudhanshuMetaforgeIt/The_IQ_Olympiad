import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
  ],
  exports: [MongooseModule],
})
export class RegistrationsModule {}
