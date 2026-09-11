import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
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
      envFilePath: [
        join(dirname(fileURLToPath(import.meta.url)), '..', '.env'),
        join(process.cwd(), '.env'),
      ],
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.getOrThrow<string>('MONGODB_URI');
        return {
          uri,
          connectionFactory: (connection: { name: string }) => {
            new Logger('MongoDB').log(`Connected to database "${connection.name}"`);
            return connection;
          },
        };
      },
    }),

    CommonModule,
    AuthModule,
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
