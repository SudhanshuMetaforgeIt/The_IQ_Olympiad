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
  ListRegistrationsQueryDto,
  UpdateRegistrationStatusDto,
} from './dto/registrations.dto.js';
import { RegistrationsService } from './registrations.service.js';

@Controller()
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Roles(UserRole.STUDENT)
  @Post('olympiads/:olympiadId/registrations')
  create(
    @CurrentUser() user: AuthUser,
    @Param('olympiadId') olympiadId: string,
  ) {
    return this.registrationsService.createForStudent(user, olympiadId);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Get('olympiads/:olympiadId/registrations')
  listByOlympiad(
    @CurrentUser() user: AuthUser,
    @Param('olympiadId') olympiadId: string,
    @Query() query: ListRegistrationsQueryDto,
  ) {
    return this.registrationsService.listByOlympiad(user, olympiadId, query);
  }

  @Roles(UserRole.STUDENT)
  @Get('registrations/me')
  listMine(
    @CurrentUser() user: AuthUser,
    @Query() query: ListRegistrationsQueryDto,
  ) {
    return this.registrationsService.listMine(user, query);
  }

  @Roles(UserRole.STUDENT, UserRole.SUPER_ADMIN)
  @Get('registrations/:id')
  getById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.registrationsService.getByIdForUser(user, id);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Patch('registrations/:id/status')
  updateStatus(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateRegistrationStatusDto,
  ) {
    return this.registrationsService.updateStatusForAdmin(user, id, dto);
  }

  @Roles(UserRole.STUDENT)
  @Patch('registrations/:id/cancel')
  cancel(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.registrationsService.cancelForStudent(user, id);
  }
}
