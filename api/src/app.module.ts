import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfigs, s3Configs } from 'configs/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountManagementModule } from './account-management/account-management.module';
import { UserManagementModule } from './user-management/user-management.module';
import { S3Module } from 'nestjs-s3';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'common/guards/role.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { MailModule } from './mail/mail.module';
import { BrokerManagementModule } from './broker-management/broker-management.module';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfigs.uri, { autoIndex: false }),
    S3Module.forRoot({
      config: {
        credentials: {
          accessKeyId: s3Configs.accessKeyId,
          secretAccessKey: s3Configs.secretAccessKey,
        },
        region: s3Configs.region,
      },
    }),
    AccountManagementModule,
    UserManagementModule,
    AuthModule,
    MailModule,
    BrokerManagementModule
  ],
  controllers: [AppController],
  providers: [
    AppService, {
      provide: APP_GUARD,
      useClass: AuthGuard
    }, {
      provide: APP_GUARD,
      useClass: RolesGuard
    }],
})
export class AppModule { }
