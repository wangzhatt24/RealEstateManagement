import { ApiProperty } from "@nestjs/swagger";
import { UpdateProviceOrCityDto } from "./update-province-or-city.dto";
import { UpdateDistrictDto } from "./update-district.dto";
import { UpdateWardDto } from "./update-ward.dto";

export class UpdateLocationDto {
  @ApiProperty({ type: 'string' })
  locationId: string;
  
  @ApiProperty({ type: UpdateProviceOrCityDto })
  provinceOrCity: UpdateProviceOrCityDto;

  @ApiProperty({ type: UpdateDistrictDto })
  district: UpdateDistrictDto;

  @ApiProperty({ type: UpdateWardDto })
  ward: UpdateWardDto;
}