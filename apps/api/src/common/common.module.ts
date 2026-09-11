import { Module } from '@nestjs/common';

import { PasswordService } from './services/password.service.js';

@Module({
  providers: [PasswordService],
  exports: [PasswordService],
})
export class CommonModule {}
