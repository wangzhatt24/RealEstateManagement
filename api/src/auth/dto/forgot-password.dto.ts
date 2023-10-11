import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export default class ForgotPasswordDto {
  @IsEmail()
  @ApiProperty({ type: 'string' })
  email: string;
}