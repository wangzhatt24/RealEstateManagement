import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export default class UpdatePasswordDto {
  @IsString()
  @ApiProperty({ type: 'string' })
  token: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  newPassword: string;
}