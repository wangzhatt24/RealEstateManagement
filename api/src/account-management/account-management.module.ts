import { Module } from '@nestjs/common';
import { AccountManagementService } from './account-management.service';
import { AccountManagementController } from './account-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'schemas/account/account.schema';
import { User, UserSchema } from 'schemas/user.schema';
import * as bcrypt from 'bcrypt'
import { bcryptConfigs } from 'configs/configs';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Account.name, useFactory: () => {
          const schema = AccountSchema;
          schema.pre('save', async function () {
            this.password = await bcrypt.hash(this.password, bcryptConfigs.saltRounds);
          })
          return schema
        }
      },
      {
        name: User.name, useFactory: () => {
          const schema = UserSchema;
          return schema;
        }
      },
    ]),
  ],
  controllers: [AccountManagementController],
  providers: [AccountManagementService],
  exports: [AccountManagementService],
})
export class AccountManagementModule { }
