import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PasswordService } from '../common/services/password.service.js';
import { UserRole } from '../common/enums/user-role.enum.js';
import { SchoolMembershipsService } from '../school-memberships/school-memberships.service.js';
import { SchoolsService } from '../schools/schools.service.js';
import { StudentsService } from '../students/students.service.js';
import type { UserDocument } from '../users/schemas/user.schema.js';
import { UsersService } from '../users/users.service.js';
import type {
  ChangePasswordDto,
  LoginPasswordDto,
  RegisterSchoolDto,
  RegisterStudentDto,
  SendOtpDto,
  StudentLoginDto,
  VerifyOtpDto,
} from './dto/auth.dto.js';
import { OtpService } from './otp.service.js';
import { TokenService } from './token.service.js';

type AuthUserView = {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  phone?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly schoolsService: SchoolsService,
    private readonly schoolMembershipsService: SchoolMembershipsService,
    private readonly studentsService: StudentsService,
    private readonly passwordService: PasswordService,
    private readonly otpService: OtpService,
    private readonly tokenService: TokenService,
  ) {}

  async registerStudent(dto: RegisterStudentDto) {
    const user = await this.usersService.create({
      email: dto.email,
      password: dto.password,
      name: dto.fullName,
      phone: dto.phone,
      roles: [UserRole.STUDENT],
    });

    try {
      await this.studentsService.create({
        userId: user._id,
        fullName: dto.fullName,
      });

      return {
        user: this.toUserView(user),
        message:
          'Account created successfully. Please log in to verify your mobile number.',
      };
    } catch (error) {
      await this.usersService.deleteById(user.id);
      throw error;
    }
  }

  async registerSchool(dto: RegisterSchoolDto) {
    const user = await this.usersService.create({
      email: dto.officialEmail,
      password: dto.password,
      name: dto.adminName,
      phone: dto.adminMobile,
      roles: [UserRole.SCHOOL_ADMIN],
    });

    try {
      const school = await this.schoolsService.create({
        code: dto.schoolCode,
        name: dto.schoolName,
        branch: dto.schoolBranch,
        email: dto.officialEmail,
        phone: dto.adminMobile,
        address: dto.address,
        schoolTypes: dto.schoolTypes,
        managedClasses: dto.managedClasses,
      });

      try {
        const membership =
          await this.schoolMembershipsService.createAdminMembership(
            user._id,
            school._id,
          );

        const tokens = await this.tokenService.issueTokens(user);

        return {
          ...tokens,
          user: this.toUserView(user),
          school: {
            id: school.id,
            code: school.code,
            name: school.name,
            branch: school.branch,
            email: school.email,
            status: school.status,
          },
          membership: {
            id: membership.id,
            userId: membership.userId.toString(),
            schoolId: membership.schoolId.toString(),
            role: membership.role,
            status: membership.status,
          },
        };
      } catch (error) {
        await this.schoolsService.deleteById(String(school._id));
        throw error;
      }
    } catch (error) {
      await this.usersService.deleteById(String(user._id));
      throw error;
    }
  }

  async loginWithPassword(dto: LoginPasswordDto) {
    const user = await this.usersService.findByEmail(dto.email, true);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    this.assertActive(user);

    if (
      user.roles.includes(UserRole.STUDENT) &&
      !user.roles.includes(UserRole.SCHOOL_ADMIN)
    ) {
      throw new UnauthorizedException(
        'Students must log in with mobile number and password',
      );
    }

    const valid = await this.passwordService.verify(
      user.passwordHash,
      dto.password,
    );
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    await this.usersService.markLogin(user.id);
    const tokens = await this.tokenService.issueTokens(user);

    return {
      ...tokens,
      user: this.toUserView(user),
    };
  }

  async loginStudent(dto: StudentLoginDto) {
    const user = await this.usersService.findByPhone(dto.phone, true);
    if (!user) {
      throw new UnauthorizedException('Invalid mobile number or password');
    }

    this.assertActive(user);

    if (!user.roles.includes(UserRole.STUDENT)) {
      throw new UnauthorizedException('This account is not a student account');
    }

    const valid = await this.passwordService.verify(
      user.passwordHash,
      dto.password,
    );
    if (!valid) {
      throw new UnauthorizedException('Invalid mobile number or password');
    }

    const result = await this.otpService.sendOtp(dto.phone, {
      passwordVerified: true,
    });

    return {
      phone: dto.phone,
      ...result,
      message: 'OTP sent successfully',
    };
  }

  async sendOtp(dto: SendOtpDto) {
    const user = await this.usersService.findByPhone(dto.phone);
    if (!user) {
      throw new UnauthorizedException('No account found for this phone number');
    }

    this.assertActive(user);

    if (
      user.roles.includes(UserRole.STUDENT) &&
      !user.roles.includes(UserRole.SCHOOL_ADMIN)
    ) {
      throw new UnauthorizedException(
        'Students must log in with mobile number and password',
      );
    }

    const result = await this.otpService.sendOtp(dto.phone);
    return {
      phone: dto.phone,
      ...result,
      message: 'OTP sent successfully',
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const user = await this.usersService.findByPhone(dto.phone);
    if (!user) {
      throw new UnauthorizedException('Invalid phone or OTP');
    }

    this.assertActive(user);

    const result = this.otpService.verifyOtp(dto.phone, dto.otp);
    if (!result.ok) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    const isStudentOnly =
      user.roles.includes(UserRole.STUDENT) &&
      !user.roles.includes(UserRole.SCHOOL_ADMIN);
    if (isStudentOnly && !result.passwordVerified) {
      throw new UnauthorizedException(
        'Verify your password before OTP login',
      );
    }

    await this.usersService.markPhoneVerified(user.id);
    await this.usersService.markLogin(user.id);
    const tokens = await this.tokenService.issueTokens(user);

    return {
      ...tokens,
      user: this.toUserView(user),
    };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException(
        'New password must be different from the current password',
      );
    }

    const user = await this.usersService.findByIdWithPassword(userId);
    const valid = await this.passwordService.verify(
      user.passwordHash,
      dto.currentPassword,
    );
    if (!valid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    await this.usersService.updatePassword(userId, dto.newPassword);
    return { message: 'Password updated successfully' };
  }

  async getMe(userId: string) {
    const user = await this.usersService.findById(userId);
    const view = this.toUserView(user);

    if (user.roles.includes(UserRole.STUDENT)) {
      try {
        const studentProfile = await this.studentsService.findByUserId(userId);
        return { user: view, studentProfile };
      } catch {
        return { user: view, studentProfile: null };
      }
    }

    if (user.roles.includes(UserRole.SCHOOL_ADMIN)) {
      const memberships =
        await this.schoolMembershipsService.findActiveByUser(userId);
      return { user: view, memberships };
    }

    return { user: view };
  }

  private assertActive(user: UserDocument): void {
    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }
  }

  private toUserView(user: UserDocument): AuthUserView {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
      phone: user.phone,
      isActive: user.isActive,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
    };
  }
}
