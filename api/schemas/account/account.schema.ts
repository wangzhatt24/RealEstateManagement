import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AccountDocument = HydratedDocument<Account>

@Schema()
export class Account {
  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  isAdmin: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account)