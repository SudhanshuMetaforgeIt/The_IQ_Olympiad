import { Controller, Get } from '@nestjs/common';

import {
  CurrentUser,
  type AuthUser,
} from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { StudentsService } from './students.service.js';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Roles(UserRole.STUDENT)
  @Get('me')
  me(@CurrentUser() user: AuthUser) {
    return this.studentsService.findByUserId(user.userId);
  }
}
