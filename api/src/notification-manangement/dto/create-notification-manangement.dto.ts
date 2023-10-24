import { ApiProperty } from "@nestjs/swagger";
import { Date } from "mongoose";
import { NotificationStateEnum } from "common/enums/notification-state.enum";

export class CreateNotificationManangementDto {
  @ApiProperty({ type: 'string' })
  notificationContent: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  notificationTime: Date;

  @ApiProperty({ enum: NotificationStateEnum })
  state: NotificationStateEnum;

  @ApiProperty({ type: 'string' })
  userId: string;
}
