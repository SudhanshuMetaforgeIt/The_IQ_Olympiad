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
  CreateExamDto,
  ListExamsQueryDto,
  UpdateExamDto,
  UpdateExamStatusDto,
} from './dto/exams.dto.js';
import { ExamsService } from './exams.service.js';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Roles(UserRole.SUPER_ADMIN)
  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateExamDto) {
    return this.examsService.create(user, dto);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get()
  list(@CurrentUser() user: AuthUser, @Query() query: ListExamsQueryDto) {
    return this.examsService.list(user, query);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get(':id/versions')
  listVersions(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.examsService.listVersions(user, id);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get(':id/versions/:versionId')
  getVersion(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Param('versionId') versionId: string,
  ) {
    return this.examsService.getVersion(user, id, versionId);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get(':id')
  getById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.examsService.getById(user, id);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateExamDto,
  ) {
    return this.examsService.update(user, id, dto);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id/status')
  updateStatus(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateExamStatusDto,
  ) {
    return this.examsService.updateStatus(user, id, dto);
  }
}
