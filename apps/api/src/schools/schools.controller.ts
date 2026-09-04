import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';

import {
  CurrentUser,
  type AuthUser,
} from '../common/decorators/current-user.decorator.js';
import { Public } from '../common/decorators/public.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import {
  ListSchoolChildrenQueryDto,
  ListSchoolsQueryDto,
  SearchSchoolsQueryDto,
  UpdateSchoolDto,
  UpdateSchoolStatusDto,
} from './dto/schools.dto.js';
import { SchoolsService } from './schools.service.js';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Public()
  @Get('code/:code')
  findByCode(@Param('code') code: string) {
    return this.schoolsService.getByCodeForSignup(code);
  }

  @Public()
  @Get('search')
  search(@Query() query: SearchSchoolsQueryDto) {
    return this.schoolsService.searchPublic(query);
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.SCHOOL_ADMIN)
  @Get()
  list(@CurrentUser() user: AuthUser, @Query() query: ListSchoolsQueryDto) {
    return this.schoolsService.listForUser(user, query);
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.SCHOOL_ADMIN)
  @Get(':id/members')
  listMembers(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Query() query: ListSchoolChildrenQueryDto,
  ) {
    return this.schoolsService.listMembersForUser(user, id, query);
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.SCHOOL_ADMIN)
  @Get(':id/students')
  listStudents(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Query() query: ListSchoolChildrenQueryDto,
  ) {
    return this.schoolsService.listStudentsForUser(user, id, query);
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.SCHOOL_ADMIN, UserRole.STUDENT)
  @Get(':id')
  findById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.schoolsService.getByIdForUser(user, id);
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.SCHOOL_ADMIN)
  @Patch(':id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateSchoolDto,
  ) {
    return this.schoolsService.updateForUser(user, id, dto);
  }

  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id/status')
  updateStatus(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateSchoolStatusDto,
  ) {
    return this.schoolsService.updateStatusForUser(user, id, dto);
  }
}
