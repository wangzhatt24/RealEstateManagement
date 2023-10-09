import { Module } from '@nestjs/common';
import { AccountManagementService } from './account-management.service';
import { AccountManagementController } from './account-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'schemas/account/account.schema';
import { User, UserSchema } from 'schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Account.name, schema: AccountSchema},
      {name: User.name, schema: UserSchema}
    ])
  ],
  controllers: [AccountManagementController],
  providers: [AccountManagementService],
  exports: [AccountManagementService]
})
export class AccountManagementModule {}
