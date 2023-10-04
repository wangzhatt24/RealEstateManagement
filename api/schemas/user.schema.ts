import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Account } from "./account/account.schema";
import { genderEnum } from "common/enums/gender.enum";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  // @Prop()
  // id: string;

  @Prop()
  displayName: string;

  @Prop()
  address: string;

  @Prop()
  phoneNumber: string;

  @Prop({ enum: genderEnum })
  gender: genderEnum;

  @Prop()
  avatar: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    unique: true,
    immutable: false
  })
  account: Account
}

export const UserSchema = SchemaFactory.createForClass(User)