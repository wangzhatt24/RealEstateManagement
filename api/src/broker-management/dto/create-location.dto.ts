import { ApiProperty } from "@nestjs/swagger";
import { CreateDistrictDto } from "./create-district.dto";
import { CreateProvinceOrCityDto } from "./create-province-or-city.dto";
import { CreateWardDto } from "./create-ward.dto";

export class CreateLocationDto {
  // id
  
  @ApiProperty({ type: CreateProvinceOrCityDto})
  provinceOrCity: CreateProvinceOrCityDto;

  @ApiProperty({ type: CreateDistrictDto })
  district: CreateDistrictDto;

  @ApiProperty({ type: CreateWardDto })
  ward: CreateWardDto;
}