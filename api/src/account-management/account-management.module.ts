import { Module, forwardRef } from '@nestjs/common';
import { AccountManagementService } from './account-management.service';
import { AccountManagementController } from './account-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'schemas/account/account.schema';
import { User, UserSchema } from 'schemas/user.schema';
import * as bcrypt from 'bcrypt'
import { bcryptConfigs } from 'configs/configs';
import { AccountState, AccountStateSchema } from 'schemas/account/account-state.schema';
import { AuthModule } from 'src/auth/auth.module';

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
      {
        name: AccountState.name, useFactory: () => {
          const schema = AccountStateSchema;
          return schema;
        }
      }
    ]),
    forwardRef(() => AuthModule)
  ],
  controllers: [AccountManagementController],
  providers: [AccountManagementService],
  exports: [AccountManagementService],
})
export class AccountManagementModule { }
