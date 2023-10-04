import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export default class SignInDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  username: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  password: string;
}