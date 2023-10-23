import { ApiProperty, PartialType } from '@nestjs/swagger';
import { NotificationStateEnum } from 'common/enums/notification-state.enum';

export class UpdateNotificationManangementDto { 
  @ApiProperty({ type: 'string' })
  notificationId: string;

  @ApiProperty({ enum: NotificationStateEnum })
  state: NotificationStateEnum;
}