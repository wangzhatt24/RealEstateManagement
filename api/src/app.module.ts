import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfigs } from 'configs/configs';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfigs.uri)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
