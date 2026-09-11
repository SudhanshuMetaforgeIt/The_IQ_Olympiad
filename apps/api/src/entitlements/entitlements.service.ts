import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, type ClientSession } from 'mongoose';

import { EntitlementStatus } from '../common/enums/entitlement-status.enum.js';
import { EntitlementType } from '../common/enums/entitlement-type.enum.js';
import {
  EntitlementConsumption,
  type EntitlementConsumptionDocument,
} from '../entitlement-consumptions/schemas/entitlement-consumption.schema.js';
import {
  Entitlement,
  type EntitlementDocument,
} from './schemas/entitlement.schema.js';

const MOCK_ATTEMPT_ENTITLEMENT_TYPES = [
  EntitlementType.PAID_MOCK_TEST_ATTEMPTS,
  EntitlementType.FREE_MOCK_TEST_ATTEMPTS,
];

export type ConsumeMockTestAttemptInput = {
  studentId: Types.ObjectId | string;
  mockTestAttemptId: Types.ObjectId | string;
  session?: ClientSession;
};

@Injectable()
export class EntitlementsService {
  constructor(
    @InjectModel(Entitlement.name)
    private readonly entitlementModel: Model<EntitlementDocument>,
    @InjectModel(EntitlementConsumption.name)
    private readonly consumptionModel: Model<EntitlementConsumptionDocument>,
  ) {}

  async consumeMockTestAttempt(
    input: ConsumeMockTestAttemptInput,
  ): Promise<EntitlementDocument> {
    const now = new Date();
    const studentId = new Types.ObjectId(input.studentId.toString());
    const mockTestAttemptId = new Types.ObjectId(
      input.mockTestAttemptId.toString(),
    );
    const sessionOptions = input.session ? { session: input.session } : {};

    const entitlement = await this.entitlementModel
      .findOneAndUpdate(
        {
          studentId,
          status: EntitlementStatus.ACTIVE,
          type: { $in: MOCK_ATTEMPT_ENTITLEMENT_TYPES },
          startsAt: { $lte: now },
          $and: [
            {
              $or: [
                { expiresAt: { $exists: false } },
                { expiresAt: null },
                { expiresAt: { $gt: now } },
              ],
            },
            { $expr: { $lt: ['$quantityUsed', '$quantityGranted'] } },
          ],
        },
        { $inc: { quantityUsed: 1 } },
        {
          new: true,
          sort: { expiresAt: 1, createdAt: 1 },
          ...sessionOptions,
        },
      )
      .exec();

    if (!entitlement) {
      throw new ForbiddenException('No remaining mock test attempts');
    }

    if (entitlement.quantityUsed >= entitlement.quantityGranted) {
      await this.entitlementModel
        .updateOne(
          {
            _id: entitlement._id,
            quantityUsed: { $gte: entitlement.quantityGranted },
          },
          { $set: { status: EntitlementStatus.EXHAUSTED } },
          sessionOptions,
        )
        .exec();
      entitlement.status = EntitlementStatus.EXHAUSTED;
    }

    try {
      await this.consumptionModel.create(
        [
          {
            entitlementId: entitlement._id,
            studentId,
            mockTestAttemptId,
            quantity: 1,
            consumedAt: now,
            idempotencyKey: `mock-test-attempt:${mockTestAttemptId.toString()}`,
            metadata: { purpose: 'MOCK_TEST_ATTEMPT' },
          },
        ],
        sessionOptions,
      );
    } catch (error) {
      if (this.isDuplicateKey(error)) {
        throw new ConflictException(
          'This mock test attempt has already consumed an entitlement',
        );
      }
      throw error;
    }

    return entitlement;
  }

  private isDuplicateKey(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: number }).code === 11000
    );
  }
}
