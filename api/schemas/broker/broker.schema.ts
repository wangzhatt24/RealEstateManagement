import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../user.schema";
import { BrokerageField } from "./brokerage-field.schema";

export type BrokerDocument = HydratedDocument<Broker>

@Schema()
export class Broker {
  // @Prop()
  // id: string;

  @Prop()
  selfIntroducing: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'BrokerageField', default: [new BrokerageField()]})
  brokerageFields: BrokerageField[];
}

export const BrokerSchema = SchemaFactory.createForClass(Broker)