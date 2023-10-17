import { ApiProperty } from "@nestjs/swagger";

export class CreateDistrictDto {
  //id
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

  @ApiProperty({ type: 'string' })
  provinceOrCityId: string;
}