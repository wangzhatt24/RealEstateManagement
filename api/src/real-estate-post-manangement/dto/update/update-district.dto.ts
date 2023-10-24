import { ApiProperty } from "@nestjs/swagger";

export class UpdateDistrictDto {
  @ApiProperty({ type: 'string' })
  districtId: string;

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