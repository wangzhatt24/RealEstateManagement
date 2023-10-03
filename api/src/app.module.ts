import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfigs, s3Configs } from 'configs/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountManagementModule } from './account-management/account-management.module';
import { UserManagementModule } from './user-management/user-management.module';
import { S3Module } from 'nestjs-s3';
import { AccountStateManagementModule } from './account-state-management/account-state-management.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfigs.uri),
    S3Module.forRoot({
      config: {
        credentials: {
          accessKeyId: s3Configs.accessKeyId,
          secretAccessKey: s3Configs.secretAccessKey
        },
        region: s3Configs.region
      }
    }),
    AccountManagementModule,
    UserManagementModule,
    AccountStateManagementModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
