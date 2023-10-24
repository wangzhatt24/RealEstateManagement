import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument } from "mongoose";
import { User } from "schemas/user.schema";
import { NotificationStateEnum } from "common/enums/notification-state.enum";

export type NotificationDocument = HydratedDocument<Notification>

@Schema()
export class Notification {
  // @Prop()
  // id: string;

  @Prop({ type: 'string', required: true, default: '' })
  notificationContent: string;

  @Prop({ type: mongoose.Schema.Types.Date, default: Date.now() })
  notificationTime: mongoose.Schema.Types.Date;

  @Prop({ enum: NotificationStateEnum, default: NotificationStateEnum.New })
  state: NotificationStateEnum;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null})
  user: User;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

