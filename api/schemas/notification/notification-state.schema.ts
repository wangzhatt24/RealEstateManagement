import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { notificationStateEnum } from "enums/notification-state.enum";
import mongoose, { Date, HydratedDocument } from "mongoose";

export type NotificationStateDocument = HydratedDocument<NotificationState>

@Schema({ timestamps: true })
export class NotificationState {
  // @Prop()
  // id: string;

  @Prop({ required: true })
  state: notificationStateEnum

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' })
  notification: Notification
}

export const NotificationStateSchema = SchemaFactory.createForClass(NotificationState)

