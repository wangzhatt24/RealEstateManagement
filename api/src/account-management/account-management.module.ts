import { Module } from '@nestjs/common';
import { AccountManagementService } from './account-management.service';
import { AccountManagementController } from './account-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'schemas/account/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Account.name, schema: AccountSchema}
    ])
  ],
  controllers: [AccountManagementController],
  providers: [AccountManagementService],
  exports: [AccountManagementService]
})
export class AccountManagementModule {}
