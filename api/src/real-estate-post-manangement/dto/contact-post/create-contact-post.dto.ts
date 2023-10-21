import { ApiProperty } from "@nestjs/swagger";
import { RealEstatePost } from "schemas/post/post.schema";

export class CreateContactPostInformationDto {
  @ApiProperty({ type: 'string' })
  displayName: string;

  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'string' })
  address: string;

  @ApiProperty({ type: 'string' })
  phoneNumber: string;

  // @ApiProperty({ type: 'string' })
  // post: RealEstatePost;
}