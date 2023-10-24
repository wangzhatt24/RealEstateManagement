import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Account } from "./account.schema";

export type AccountStateDocument = HydratedDocument<AccountState>

@Schema()
export class AccountState {
  // @Prop()
  // id: string;

  @Prop({ required: false })
  lockedReason: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: false })
  executor: Account;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: false })
  target: Account;
}

export const AccountStateSchema = SchemaFactory.createForClass(AccountState)