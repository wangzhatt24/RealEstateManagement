import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Account } from "./account/account.schema";
import { genderEnum } from "common/enums/gender.enum";
import { Broker } from "./broker/broker.schema";
import { RealEstatePost } from "./post/post.schema";
import { UserSavePosts } from "./post/user-save-posts.schema";
import { Report } from "./report/report.schema";
import { Notification } from "./notification/notification.schema";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  // @Prop()
  // id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ })
  displayName: string;

  @Prop({ })
  address: string;

  @Prop({ })
  phoneNumber: string;

  @Prop({ enum: genderEnum, default: genderEnum.MALE })
  gender: genderEnum;

  @Prop({ required: false })
  avatar: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: false,
  })
  account: Account;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Broker',
    required: false
  })
  broker: Broker;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: "RealEstatePost",
    required: false,
    default: []
  })
  realEstatePosts: RealEstatePost[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: "UserSavePosts",
    required: false,
    default: []
  })
  userSavePosts: UserSavePosts[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Report",
    required: false,
    default: []
  })
  reports: Report[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Notification",
    required: false,
    default: []
  })
  notifications: Notification[];
}

export const UserSchema = SchemaFactory.createForClass(User)