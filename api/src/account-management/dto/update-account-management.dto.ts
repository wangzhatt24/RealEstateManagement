import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAccountManagementDto } from './create-account-management.dto';
import { IsString } from 'class-validator';

export class UpdateAccountManagementDto {
  @ApiProperty()
  @IsString()
  newPassword: string;
}
