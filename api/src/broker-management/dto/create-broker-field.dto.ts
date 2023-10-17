import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { AllRealEstateEnum, RealEstateType, RentalRealEstateEnum, SaleRealEstateEnum } from "common/enums/real-estate-type.enum";
import { CreateLocationDto } from "./create-location.dto";

export class CreateBrokerFieldDto {
  //id

  @ApiProperty({
    enum: AllRealEstateEnum,
  })
  realEstateType: string;

  @ApiProperty({ type: CreateLocationDto })
  location: CreateLocationDto;

  @ApiProperty()
  @IsString()
  brokerId: string;
}