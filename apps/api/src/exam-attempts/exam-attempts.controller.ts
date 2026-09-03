import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import {
  CurrentUser,
  type AuthUser,
} from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import {
  ListMyExamAttemptsQueryDto,
  SaveExamAnswersDto,
} from './dto/exam-attempts.dto.js';
import { ExamAttemptsService } from './exam-attempts.service.js';

@Controller()
export class ExamAttemptsController {
  constructor(private readonly examAttemptsService: ExamAttemptsService) {}

  @Roles(UserRole.STUDENT)
  @Post('exams/:examId/attempts')
  create(@CurrentUser() user: AuthUser, @Param('examId') examId: string) {
    return this.examAttemptsService.create(user, examId);
  }

  @Roles(UserRole.STUDENT)
  @Get('exam-attempts/me')
  listMine(
    @CurrentUser() user: AuthUser,
    @Query() query: ListMyExamAttemptsQueryDto,
  ) {
    return this.examAttemptsService.listMine(user, query);
  }

  @Roles(UserRole.STUDENT)
  @Get('exam-attempts/:id')
  getById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.examAttemptsService.getById(user, id);
  }

  @Roles(UserRole.STUDENT)
  @Patch('exam-attempts/:id/start')
  start(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.examAttemptsService.start(user, id);
  }

  @Roles(UserRole.STUDENT)
  @Patch('exam-attempts/:id/answers')
  saveAnswers(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: SaveExamAnswersDto,
  ) {
    return this.examAttemptsService.saveAnswers(user, id, dto);
  }

  @Roles(UserRole.STUDENT)
  @Patch('exam-attempts/:id/submit')
  submit(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.examAttemptsService.submit(user, id);
  }
}
