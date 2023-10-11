import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdatePasswordByAccountIdDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  id: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  oldPassword: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  newPassword: string;
}