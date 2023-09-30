import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfigs } from 'configs/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountManagementModule } from './account-management/account-management.module';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfigs.uri),
    AccountManagementModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
