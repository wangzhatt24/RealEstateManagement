import { ApiProperty } from "@nestjs/swagger";
import { BasicPostInformation } from "schemas/post/basic-post-information.schema";
import { CreateBasicPostInformationDto } from "./basic-post-information/create-basic-post-information.dto";
import { CreateContactPostInformationDto } from "./contact-post/create-contact-post.dto";
import { ContactPost } from "schemas/post/contact-post.schema";

export class CreateRealEstatePostManangementDto {
  /**
   * Khai thác thông tin gì?
   * 
   */

  //postId

  @ApiProperty({ type: 'string' })
  userId: string;

  // @ApiProperty({ type: 'string' })
  // postState: PostState;

  @ApiProperty({ type: CreateBasicPostInformationDto })
  basicPostInformation: CreateBasicPostInformationDto;

  @ApiProperty({ type: CreateContactPostInformationDto })
  contactPostInformation: CreateContactPostInformationDto;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
  })
  realEstateImages: any[];
}
