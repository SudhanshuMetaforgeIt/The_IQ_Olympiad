import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  CurrentUser,
  type AuthUser,
} from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import {
  CreateQuestionDto,
  ListQuestionsQueryDto,
  UpdateQuestionDto,
  UpdateQuestionStatusDto,
} from './dto/questions.dto.js';
import { QuestionsService } from './questions.service.js';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Roles(UserRole.SUPER_ADMIN)
  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateQuestionDto) {
    return this.questionsService.create(user, dto);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get()
  list(@CurrentUser() user: AuthUser, @Query() query: ListQuestionsQueryDto) {
    return this.questionsService.list(user, query);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get(':id/versions')
  listVersions(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.questionsService.listVersions(user, id);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get(':id/versions/:versionId')
  getVersion(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Param('versionId') versionId: string,
  ) {
    return this.questionsService.getVersion(user, id, versionId);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get(':id')
  getById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.questionsService.getById(user, id);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(user, id, dto);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id/status')
  updateStatus(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateQuestionStatusDto,
  ) {
    return this.questionsService.updateStatus(user, id, dto);
  }
}
