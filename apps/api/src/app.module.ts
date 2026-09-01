import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CommonModule } from './common/common.module.js';
import { EntitlementConsumptionsModule } from './entitlement-consumptions/entitlement-consumptions.module.js';
import { EntitlementsModule } from './entitlements/entitlements.module.js';
import { ExamAttemptsModule } from './exam-attempts/exam-attempts.module.js';
import { ExamsModule } from './exams/exams.module.js';
import { MockTestAttemptsModule } from './mock-test-attempts/mock-test-attempts.module.js';
import { MockTestsModule } from './mock-tests/mock-tests.module.js';
import { OlympiadsModule } from './olympiads/olympiads.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { QuestionsModule } from './questions/questions.module.js';
import { RegistrationsModule } from './registrations/registrations.module.js';
import { SchoolMembershipsModule } from './school-memberships/school-memberships.module.js';
import { SchoolsModule } from './schools/schools.module.js';
import { StudentsModule } from './students/students.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGODB_URI'),
      }),
    }),

    CommonModule,
    UsersModule,
    SchoolsModule,
    SchoolMembershipsModule,
    StudentsModule,
    OlympiadsModule,
    QuestionsModule,
    ExamsModule,
    RegistrationsModule,
    ExamAttemptsModule,
    MockTestsModule,
    MockTestAttemptsModule,
    PaymentsModule,
    EntitlementsModule,
    EntitlementConsumptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
