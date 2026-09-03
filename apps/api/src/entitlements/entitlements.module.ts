import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EntitlementConsumptionsModule } from '../entitlement-consumptions/entitlement-consumptions.module.js';
import { EntitlementsService } from './entitlements.service.js';
import {
  Entitlement,
  EntitlementSchema,
} from './schemas/entitlement.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Entitlement.name, schema: EntitlementSchema },
    ]),
    EntitlementConsumptionsModule,
  ],
  providers: [EntitlementsService],
  exports: [MongooseModule, EntitlementsService],
})
export class EntitlementsModule {}
