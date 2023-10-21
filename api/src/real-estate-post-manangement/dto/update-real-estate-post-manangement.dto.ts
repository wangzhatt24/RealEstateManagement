import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BasicPostInformation } from 'schemas/post/basic-post-information.schema';
import { UpdateBasicPostInformationDto } from './update/update-basic-post-information.dto';
import { UpdateContactPostDto } from './update/update-contact-post.dto';

export class UpdateRealEstatePostManangementDto {
  @ApiProperty({ type: 'string' })
  postId: string;

  @ApiProperty({ type: UpdateBasicPostInformationDto })
  basicPostInformation: UpdateBasicPostInformationDto;

  @ApiProperty({ type: UpdateContactPostDto })
  contactPostInformation: UpdateContactPostDto;

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
