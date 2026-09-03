import { Injectable, Logger } from '@nestjs/common';
import { createHash, randomInt } from 'node:crypto';

type OtpRecord = {
  codeHash: string;
  expiresAt: number;
  attempts: number;
};

/**
 * In-memory OTP store for Phase 2.
 * Production should replace this with Redis + SMS/email provider.
 */
@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);
  private readonly store = new Map<string, OtpRecord>();
  private readonly ttlMs = 5 * 60 * 1000;
  private readonly maxAttempts = 5;

  async sendOtp(
    phone: string,
  ): Promise<{ expiresInSeconds: number; debugCode?: string }> {
    const code = randomInt(100000, 999999).toString();
    this.store.set(phone, {
      codeHash: this.hash(code),
      expiresAt: Date.now() + this.ttlMs,
      attempts: 0,
    });

    const isProd = process.env.NODE_ENV === 'production';
    if (!isProd) {
      this.logger.log(`OTP for ${phone}: ${code}`);
    }

    return {
      expiresInSeconds: Math.floor(this.ttlMs / 1000),
      ...(!isProd ? { debugCode: code } : {}),
    };
  }

  verifyOtp(phone: string, otp: string): boolean {
    const record = this.store.get(phone);
    if (!record) {
      return false;
    }

    if (Date.now() > record.expiresAt) {
      this.store.delete(phone);
      return false;
    }

    if (record.attempts >= this.maxAttempts) {
      this.store.delete(phone);
      return false;
    }

    record.attempts += 1;

    if (record.codeHash !== this.hash(otp)) {
      return false;
    }

    this.store.delete(phone);
    return true;
  }

  private hash(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }
}
