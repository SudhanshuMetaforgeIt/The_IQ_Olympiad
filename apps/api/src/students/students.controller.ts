import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import type { Express } from 'express';

import {
  CurrentUser,
  type AuthUser,
} from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { UpdateStudentProfileDto } from './dto/student-profile.dto.js';
import {
  PROFILE_PHOTO_FIELD,
  createProfilePhotoMulterOptions,
} from './profile-photo.storage.js';
import { StudentsService } from './students.service.js';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Roles(UserRole.STUDENT)
  @Get('me')
  me(@CurrentUser() user: AuthUser) {
    return this.studentsService.getMe(user.userId);
  }

  @Roles(UserRole.STUDENT)
  @Get('profile')
  getProfile(@CurrentUser() user: AuthUser) {
    return this.studentsService.getProfile(user.userId);
  }

  @Roles(UserRole.STUDENT)
  @Patch('profile')
  updateProfile(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateStudentProfileDto,
  ) {
    return this.studentsService.updateProfile(user.userId, dto);
  }

  @Roles(UserRole.STUDENT)
  @Post('profile/photo')
  @UseInterceptors(
    FileInterceptor(PROFILE_PHOTO_FIELD, createProfilePhotoMulterOptions()),
  )
  uploadProfilePhoto(
    @CurrentUser() user: AuthUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.studentsService.uploadProfilePhoto(user.userId, file);
  }
}
