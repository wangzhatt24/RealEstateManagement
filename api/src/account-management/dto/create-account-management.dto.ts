import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateAccountManagementDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  // @ApiProperty({ default: false })
  // @IsBoolean()
  // isAdmin: boolean;
}
