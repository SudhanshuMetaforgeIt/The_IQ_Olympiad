import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import {
  CurrentUser,
  type AuthUser,
} from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import {
  ListMyMockTestAttemptsQueryDto,
  SaveMockTestAnswersDto,
} from './dto/mock-test-attempts.dto.js';
import { MockTestAttemptsService } from './mock-test-attempts.service.js';

@Controller()
export class MockTestAttemptsController {
  constructor(
    private readonly mockTestAttemptsService: MockTestAttemptsService,
  ) {}

  @Roles(UserRole.STUDENT)
  @Post('mock-tests/:mockTestId/attempts')
  create(
    @CurrentUser() user: AuthUser,
    @Param('mockTestId') mockTestId: string,
  ) {
    return this.mockTestAttemptsService.create(user, mockTestId);
  }

  @Roles(UserRole.STUDENT)
  @Get('mock-test-attempts/me')
  listMine(
    @CurrentUser() user: AuthUser,
    @Query() query: ListMyMockTestAttemptsQueryDto,
  ) {
    return this.mockTestAttemptsService.listMine(user, query);
  }

  @Roles(UserRole.STUDENT)
  @Get('mock-test-attempts/:id')
  getById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.mockTestAttemptsService.getById(user, id);
  }

  @Roles(UserRole.STUDENT)
  @Patch('mock-test-attempts/:id/start')
  start(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.mockTestAttemptsService.start(user, id);
  }

  @Roles(UserRole.STUDENT)
  @Patch('mock-test-attempts/:id/answers')
  saveAnswers(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: SaveMockTestAnswersDto,
  ) {
    return this.mockTestAttemptsService.saveAnswers(user, id, dto);
  }

  @Roles(UserRole.STUDENT)
  @Patch('mock-test-attempts/:id/submit')
  submit(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.mockTestAttemptsService.submit(user, id);
  }
}
