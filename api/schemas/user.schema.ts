import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Account } from "./account/account.schema";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  displayName: string;

  @Prop()
  address: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  gender: string;

  @Prop()
  avatar: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account'})
  account: Account
}

export const UserSchema = SchemaFactory.createForClass(User)