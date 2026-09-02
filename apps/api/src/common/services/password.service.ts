import { Injectable } from '@nestjs/common';
import { argon2id, hash, verify, type HashOptions } from 'argon2';

@Injectable()
export class PasswordService {
  private readonly argonOptions: HashOptions = {
    type: argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 1,
  };

  async hash(password: string): Promise<string> {
    return hash(password, this.argonOptions);
  }

  async verify(passwordHash: string, password: string): Promise<boolean> {
    try {
      return await verify(passwordHash, password);
    } catch {
      return false;
    }
  }
}
