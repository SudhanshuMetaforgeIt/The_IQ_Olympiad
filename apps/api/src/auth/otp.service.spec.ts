import { beforeEach, describe, expect, it } from 'vitest';

import { OtpService } from './otp.service.js';

describe('OtpService', () => {
  let service: OtpService;

  beforeEach(() => {
    process.env.NODE_ENV = 'test';
    service = new OtpService();
  });

  it('rejects verification before an OTP is sent', () => {
    expect(service.verifyOtp('9876543210', '123456')).toEqual({
      ok: false,
      passwordVerified: false,
    });
  });

  it('accepts a valid OTP once and rejects reuse', async () => {
    const { debugCode } = await service.sendOtp('9876543210');
    expect(debugCode).toMatch(/^\d{6}$/);

    expect(service.verifyOtp('9876543210', debugCode!)).toEqual({
      ok: true,
      passwordVerified: false,
    });
    expect(service.verifyOtp('9876543210', debugCode!)).toEqual({
      ok: false,
      passwordVerified: false,
    });
  });

  it('rejects an incorrect OTP', async () => {
    await service.sendOtp('9876543210');
    expect(service.verifyOtp('9876543210', '000000')).toEqual({
      ok: false,
      passwordVerified: false,
    });
  });

  it('preserves passwordVerified after a successful student login OTP', async () => {
    const { debugCode } = await service.sendOtp('9876543210', {
      passwordVerified: true,
    });

    expect(service.verifyOtp('9876543210', debugCode!)).toEqual({
      ok: true,
      passwordVerified: true,
    });
  });
});
