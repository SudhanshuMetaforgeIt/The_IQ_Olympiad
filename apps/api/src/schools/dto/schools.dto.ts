import { Type } from 'class-transformer';
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

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import {
  SchoolStatus,
  SCHOOL_STATUSES,
} from '../../common/enums/school-status.enum.js';
import { SchoolType } from '../../common/enums/school-type.enum.js';

export class SearchSchoolsQueryDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  q: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  limit = 8;
}

export class ListSchoolsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @IsOptional()
  @IsEnum(SchoolStatus)
  status?: SchoolStatus;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;
}

export class UpdateSchoolAddressDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  city?: string;

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

export class UpdateSchoolDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  branch?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @Matches(/^[6-9]\d{9}$/, {
    message: 'phone must be a valid 10-digit Indian mobile number',
  })
  phone?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateSchoolAddressDto)
  address?: UpdateSchoolAddressDto;

  @IsOptional()
  @IsArray()
  @IsEnum(SchoolType, { each: true })
  schoolTypes?: SchoolType[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(12, { each: true })
  managedClasses?: number[];
}

export class UpdateSchoolStatusDto {
  @IsEnum(SchoolStatus, {
    message: `status must be one of: ${SCHOOL_STATUSES.join(', ')}`,
  })
  status: SchoolStatus;
}

export class ListSchoolChildrenQueryDto extends PaginationQueryDto {}
