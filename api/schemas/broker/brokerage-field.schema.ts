import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Broker } from "./broker.schema";
import { BrokerageFieldEnum } from "enums/broker-field.enum";
import { Location } from "../location/location.schema";

export type BrokerageFieldDocument = HydratedDocument<BrokerageField>

@Schema()
export class BrokerageField {
  // @Prop()
  // id: string;
  /**
   * Chỗ này cần xem lại về thiết kế db cho vị trí
   */

  @Prop({ required: true, enum: BrokerageFieldEnum })
  brokerageField: BrokerageFieldEnum;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location'})
  location: Location;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Broker'})
  broker: Broker;
}

export const LocationSchema = SchemaFactory.createForClass(Location)
