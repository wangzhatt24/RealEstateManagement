import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "schemas/user.schema";
import { AccountState } from "./account-state.schema";

export type AccountDocument = HydratedDocument<Account>

@Schema()
export class Account {
  // @Prop()
  // id: string;

  @Prop({ required: true, unique: true, immutable: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false, immutable: true })
  isAdmin: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountState',
    required: true
  })
  accountState: AccountState;
}

export const AccountSchema = SchemaFactory.createForClass(Account)