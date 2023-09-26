import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../user.schema";

export type BrokerDocument = HydratedDocument<Broker>

@Schema()
export class Broker {
  @Prop()
  id: string;

  @Prop()
  seflIntroducing: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User
}

export const BrokerSchema = SchemaFactory.createForClass(Broker)