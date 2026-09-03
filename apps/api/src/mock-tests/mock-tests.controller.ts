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
  CreateMockTestDto,
  ListMockTestsQueryDto,
  UpdateMockTestDto,
  UpdateMockTestStatusDto,
} from './dto/mock-tests.dto.js';
import { MockTestsService } from './mock-tests.service.js';

@Controller('mock-tests')
export class MockTestsController {
  constructor(private readonly mockTestsService: MockTestsService) {}

  @Roles(UserRole.SUPER_ADMIN)
  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateMockTestDto) {
    return this.mockTestsService.create(user, dto);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get()
  list(@CurrentUser() user: AuthUser, @Query() query: ListMockTestsQueryDto) {
    return this.mockTestsService.list(user, query);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get(':id/versions')
  listVersions(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.mockTestsService.listVersions(user, id);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get(':id/versions/:versionId')
  getVersion(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Param('versionId') versionId: string,
  ) {
    return this.mockTestsService.getVersion(user, id, versionId);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get(':id')
  getById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.mockTestsService.getById(user, id);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateMockTestDto,
  ) {
    return this.mockTestsService.update(user, id, dto);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id/status')
  updateStatus(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateMockTestStatusDto,
  ) {
    return this.mockTestsService.updateStatus(user, id, dto);
  }
}
