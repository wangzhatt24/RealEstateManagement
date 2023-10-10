import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'schemas/account/account.schema';

export class CreateAccountStateManagementDto {
  // id: string;

  @ApiProperty({ type: 'string' })
  lockedReason: string;

  @ApiProperty({ type: 'string' })
  executor: Account;

  @ApiProperty({ type: 'string' })
  target: Account;
}
