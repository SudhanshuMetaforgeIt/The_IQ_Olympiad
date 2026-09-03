import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserRole } from '../common/enums/user-role.enum.js';
import type { UserDocument } from '../users/schemas/user.schema.js';

export type JwtPayload = {
  sub: string;
  email: string;
  roles: UserRole[];
};

export type AuthTokens = {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: string;
};

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async issueTokens(user: UserDocument): Promise<AuthTokens> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const expiresIn =
      this.configService.get<string>('JWT_EXPIRES_IN') ?? '7d';

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn,
    };
  }
}
