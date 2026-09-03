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
  CreateOlympiadDto,
  ListOlympiadsQueryDto,
  UpdateOlympiadDto,
  UpdateOlympiadStatusDto,
} from './dto/olympiads.dto.js';
import { OlympiadsService } from './olympiads.service.js';

@Controller('olympiads')
export class OlympiadsController {
  constructor(private readonly olympiadsService: OlympiadsService) {}

  @Roles(UserRole.SUPER_ADMIN, UserRole.SCHOOL_ADMIN, UserRole.STUDENT)
  @Get()
  list(@CurrentUser() user: AuthUser, @Query() query: ListOlympiadsQueryDto) {
    return this.olympiadsService.listForUser(user, query);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateOlympiadDto) {
    return this.olympiadsService.createForUser(user, dto);
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.SCHOOL_ADMIN, UserRole.STUDENT)
  @Get(':id')
  findById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.olympiadsService.getByIdForUser(user, id);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateOlympiadDto,
  ) {
    return this.olympiadsService.updateForUser(user, id, dto);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id/status')
  updateStatus(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateOlympiadStatusDto,
  ) {
    return this.olympiadsService.updateStatusForUser(user, id, dto);
  }
}
