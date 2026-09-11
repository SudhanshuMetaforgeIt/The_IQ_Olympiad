import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import { OlympiadRegistrationStatus } from '../../common/enums/olympiad-registration-status.enum.js';

export class ListRegistrationsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(OlympiadRegistrationStatus)
  status?: OlympiadRegistrationStatus;
}

export class UpdateRegistrationStatusDto {
  @IsEnum([
    OlympiadRegistrationStatus.CONFIRMED,
    OlympiadRegistrationStatus.REJECTED,
  ], {
    message: 'status must be CONFIRMED or REJECTED',
  })
  status:
    | OlympiadRegistrationStatus.CONFIRMED
    | OlympiadRegistrationStatus.REJECTED;

  @ValidateIf(
    (dto: UpdateRegistrationStatusDto) =>
      dto.status === OlympiadRegistrationStatus.REJECTED,
  )
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  rejectionReason?: string;
}
