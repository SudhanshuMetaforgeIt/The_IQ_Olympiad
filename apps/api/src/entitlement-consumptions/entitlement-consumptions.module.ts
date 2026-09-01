import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  EntitlementConsumption,
  EntitlementConsumptionSchema,
} from './schemas/entitlement-consumption.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EntitlementConsumption.name,
        schema: EntitlementConsumptionSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class EntitlementConsumptionsModule {}
