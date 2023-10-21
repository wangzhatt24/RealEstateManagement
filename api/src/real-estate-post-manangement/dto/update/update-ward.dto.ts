import { ApiProperty } from "@nestjs/swagger";

export class UpdateWardDto {
  @ApiProperty({ type: 'string' })
  wardId: string;

  @ApiProperty({ type: 'string' })
  name: string;

  @ApiProperty({ type: 'number' })
  code: number;

  @ApiProperty({ type: 'string' })
  codename: string;

  @ApiProperty({ type: 'string' })
  division_type: string;

  @ApiProperty({ type: 'string' })
  short_codename: string;
}