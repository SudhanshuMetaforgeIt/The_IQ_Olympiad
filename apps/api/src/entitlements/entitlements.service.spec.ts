import {
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { EntitlementStatus } from '../common/enums/entitlement-status.enum.js';
import { EntitlementType } from '../common/enums/entitlement-type.enum.js';
import { EntitlementsService } from './entitlements.service.js';

const studentId = '64b64c4f2f1c2a3b4c5d6f21';
const attemptId = '64b64c4f2f1c2a3b4c5d6f22';
const entitlementId = '64b64c4f2f1c2a3b4c5d6f23';

describe('EntitlementsService', () => {
  const entitlementModel = {
    findOneAndUpdate: vi.fn(),
    updateOne: vi.fn(),
  };
  const consumptionModel = {
    create: vi.fn(),
  };

  let service: EntitlementsService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new EntitlementsService(
      entitlementModel as never,
      consumptionModel as never,
    );
  });

  it('atomically consumes one remaining mock-test attempt', async () => {
    entitlementModel.findOneAndUpdate.mockReturnValue({
      exec: vi.fn().mockResolvedValue({
        _id: entitlementId,
        quantityUsed: 1,
        quantityGranted: 3,
        status: EntitlementStatus.ACTIVE,
      }),
    });
    consumptionModel.create.mockResolvedValue([{}]);

    await service.consumeMockTestAttempt({
      studentId,
      mockTestAttemptId: attemptId,
    });

    const filter = entitlementModel.findOneAndUpdate.mock.calls[0][0];
    expect(filter.status).toBe(EntitlementStatus.ACTIVE);
    expect(filter.type.$in).toEqual([
      EntitlementType.PAID_MOCK_TEST_ATTEMPTS,
      EntitlementType.FREE_MOCK_TEST_ATTEMPTS,
    ]);
    expect(filter.$and[1]).toEqual({
      $expr: { $lt: ['$quantityUsed', '$quantityGranted'] },
    });
    expect(entitlementModel.findOneAndUpdate.mock.calls[0][1]).toEqual({
      $inc: { quantityUsed: 1 },
    });
    expect(consumptionModel.create).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          quantity: 1,
          mockTestAttemptId: expect.any(Types.ObjectId),
          idempotencyKey: `mock-test-attempt:${attemptId}`,
        }),
      ],
      {},
    );
  });

  it('rejects when no remaining entitlement quantity exists', async () => {
    entitlementModel.findOneAndUpdate.mockReturnValue({
      exec: vi.fn().mockResolvedValue(null),
    });

    await expect(
      service.consumeMockTestAttempt({
        studentId,
        mockTestAttemptId: attemptId,
      }),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(consumptionModel.create).not.toHaveBeenCalled();
  });

  it('treats a second concurrent consume as insufficient once quantity is gone', async () => {
    entitlementModel.findOneAndUpdate
      .mockReturnValueOnce({
        exec: vi.fn().mockResolvedValue({
          _id: entitlementId,
          quantityUsed: 1,
          quantityGranted: 1,
          status: EntitlementStatus.ACTIVE,
        }),
      })
      .mockReturnValueOnce({
        exec: vi.fn().mockResolvedValue(null),
      });
    entitlementModel.updateOne.mockReturnValue({
      exec: vi.fn().mockResolvedValue({ modifiedCount: 1 }),
    });
    consumptionModel.create.mockResolvedValue([{}]);

    await service.consumeMockTestAttempt({
      studentId,
      mockTestAttemptId: attemptId,
    });

    await expect(
      service.consumeMockTestAttempt({
        studentId,
        mockTestAttemptId: '64b64c4f2f1c2a3b4c5d6f24',
      }),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('rejects duplicate ledger rows for the same attempt', async () => {
    entitlementModel.findOneAndUpdate.mockReturnValue({
      exec: vi.fn().mockResolvedValue({
        _id: entitlementId,
        quantityUsed: 1,
        quantityGranted: 5,
        status: EntitlementStatus.ACTIVE,
      }),
    });
    consumptionModel.create.mockRejectedValue({ code: 11000 });

    await expect(
      service.consumeMockTestAttempt({
        studentId,
        mockTestAttemptId: attemptId,
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
