import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument } from "mongoose";
import { User } from "schemas/user.schema";

export type NotificationDocument = HydratedDocument<Notification>

@Schema({ timestamps: true })
export class Notification {
  // @Prop()
  // id: string;

  @Prop({ required: true })
  notificationContent: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)

