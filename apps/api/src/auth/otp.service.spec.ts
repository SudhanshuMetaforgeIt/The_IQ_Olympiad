import { beforeEach, describe, expect, it } from 'vitest';

import { OtpService } from './otp.service.js';

describe('OtpService', () => {
  let service: OtpService;

  beforeEach(() => {
    process.env.NODE_ENV = 'test';
    service = new OtpService();
  });

  it('rejects verification before an OTP is sent', () => {
    expect(service.verifyOtp('9876543210', '123456')).toBe(false);
  });

  it('accepts a valid OTP once and rejects reuse', async () => {
    const { debugCode } = await service.sendOtp('9876543210');
    expect(debugCode).toMatch(/^\d{6}$/);

    expect(service.verifyOtp('9876543210', debugCode!)).toBe(true);
    expect(service.verifyOtp('9876543210', debugCode!)).toBe(false);
  });

  it('rejects an incorrect OTP', async () => {
    await service.sendOtp('9876543210');
    expect(service.verifyOtp('9876543210', '000000')).toBe(false);
  });
});
