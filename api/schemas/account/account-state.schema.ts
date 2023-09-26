import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Account } from "./account.schema";

export type AccountStateDocument = HydratedDocument<AccountState>

@Schema()
export class AccountState {
  @Prop()
  id: string;

  @Prop()
  lockedReason: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  executor: Account;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account'})
  target: Account;
}

export const AccountStateSchema = SchemaFactory.createForClass(AccountState)