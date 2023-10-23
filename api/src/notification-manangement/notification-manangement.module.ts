import { Module, forwardRef } from '@nestjs/common';
import { NotificationManangementService } from './notification-manangement.service';
import { NotificationManangementController } from './notification-manangement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from 'schemas/notification/notification.schema';
import { UserManagementModule } from 'src/user-management/user-management.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema }
    ]),
    forwardRef(() => UserManagementModule)
  ],
  controllers: [NotificationManangementController],
  providers: [NotificationManangementService]
})
export class NotificationManangementModule {}
