import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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
}

export const AccountSchema = SchemaFactory.createForClass(Account)