import { ApiProperty } from "@nestjs/swagger";

export class ReporterDto {
  @ApiProperty({ type: 'string' })
  fullname: string;

  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'string' })
  phoneNumber: string;
}