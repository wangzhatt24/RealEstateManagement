import { ApiProperty } from "@nestjs/swagger";

export class UpdateContactPostDto {
  @ApiProperty({ type: 'string' })
  contactPostId: string;

  @ApiProperty({ type: 'string' })
  displayName: string;

  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'string' })
  address: string;

  @ApiProperty({ type: 'string' })
  phoneNumber: string;
}