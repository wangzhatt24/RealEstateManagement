import { ApiProperty } from '@nestjs/swagger';
import { genderEnum } from 'common/enums/gender.enum';
import { Account } from 'schemas/account/account.schema';

export class CreateUserManagementDto {
  @ApiProperty()
  displayName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty({ enum: genderEnum })
  gender: genderEnum;

  @ApiProperty({ type: 'string', format: 'binary' })
  avatar: Express.Multer.File;

  @ApiProperty({ required: true, type: 'string' })
  account: Account;
}
