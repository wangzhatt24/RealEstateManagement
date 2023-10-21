import { ApiProperty } from "@nestjs/swagger";
import { AllRealEstateEnum, RealEstateType } from "common/enums/real-estate-type.enum";
import { saleOrRental } from "common/enums/sale-or-rental.enum";
import { Location } from "schemas/location/location.schema";
import { UpdateLocationDto } from "./update-location.dto";

export class UpdateBasicPostInformationDto {
  @ApiProperty({ type: 'string' })
  basicPostInforId: string;

  @ApiProperty({ enum: saleOrRental })
  saleOrRentalType: saleOrRental;

  @ApiProperty({ enum: AllRealEstateEnum })
  realEstateType: AllRealEstateEnum;

  @ApiProperty({ type: UpdateLocationDto })
  location: UpdateLocationDto;

  @ApiProperty({ type: 'string' })
  detailtAddress: string;

  @ApiProperty({ type: 'string' })
  postTitle: string;

  @ApiProperty({ type: 'number' })
  referencePrice: number;

  @ApiProperty({ type: 'number' })
  acreage: number;

  @ApiProperty({ type: 'number' })
  bedRooms: number;

  @ApiProperty({ type: 'string' })
  direction: string;

  @ApiProperty({ type: 'number' })
  toilets: number;

  @ApiProperty({ type: 'string' })
  interior: string;

  @ApiProperty({ type: 'string' })
  legalInformation: string;

  @ApiProperty({ type: 'string' })
  description: string;

  // post: RealEstatePost;
}