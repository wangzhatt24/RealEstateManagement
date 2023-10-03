import { Module } from '@nestjs/common';
import { AccountStateManagementService } from './account-state-management.service';
import { AccountStateManagementController } from './account-state-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountState, AccountStateSchema } from 'schemas/account/account-state.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountState.name, schema: AccountStateSchema }
    ])
  ],
  controllers: [AccountStateManagementController],
  providers: [AccountStateManagementService]
})
export class AccountStateManagementModule { }
