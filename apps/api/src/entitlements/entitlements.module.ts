import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Entitlement,
  EntitlementSchema,
} from './schemas/entitlement.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Entitlement.name, schema: EntitlementSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class EntitlementsModule {}
