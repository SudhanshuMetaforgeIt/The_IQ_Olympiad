import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { SchoolType } from '../../common/enums/school-type.enum.js';

const PHONE_REGEX = /^[6-9]\d{9}$/;
const SCHOOL_CODE_REGEX = /^[A-Z0-9-]+$/;

export class RegisterStudentDto {
  @IsString()
  @MaxLength(120)
  fullName: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @Matches(PHONE_REGEX, {
    message: 'phone must be a valid 10-digit Indian mobile number',
  })
  phone: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}

export class SchoolAddressDto {
  @IsString()
  @MaxLength(100)
  city: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  line1?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  line2?: string;

  @IsOptional()
  @Matches(/^\d{6}$/, { message: 'pincode must be a 6-digit number' })
  pincode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;
}

export class RegisterSchoolDto {
  @IsString()
  @MaxLength(120)
  adminName: string;

  @IsEmail()
  @MaxLength(255)
  officialEmail: string;

  @Matches(PHONE_REGEX, {
    message: 'adminMobile must be a valid 10-digit Indian mobile number',
  })
  adminMobile: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;

  @IsString()
  @MaxLength(200)
  schoolName: string;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(SCHOOL_CODE_REGEX)
  schoolCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  schoolBranch?: string;

  @ValidateNested()
  @Type(() => SchoolAddressDto)
  address: SchoolAddressDto;

  @IsOptional()
  @IsArray()
  @IsEnum(SchoolType, { each: true })
  schoolTypes?: SchoolType[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(12, { each: true })
  managedClasses?: number[];
}

export class LoginPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}

export class StudentLoginDto {
  @Matches(PHONE_REGEX, {
    message: 'phone must be a valid 10-digit Indian mobile number',
  })
  phone: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}

export class SendOtpDto {
  @Matches(PHONE_REGEX, {
    message: 'phone must be a valid 10-digit Indian mobile number',
  })
  phone: string;
}

export class VerifyOtpDto {
  @Matches(PHONE_REGEX, {
    message: 'phone must be a valid 10-digit Indian mobile number',
  })
  phone: string;

  @Matches(/^\d{6}$/, { message: 'otp must be a 6-digit code' })
  otp: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  currentPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  newPassword: string;
}
