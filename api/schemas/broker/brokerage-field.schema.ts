import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Broker } from "./broker.schema";
import { BrokerageFieldEnum } from "common/enums/broker-field.enum";
import { Location } from "../location/location.schema";
import { AllRealEstateEnum } from "common/enums/real-estate-type.enum";

export type BrokerageFieldDocument = HydratedDocument<BrokerageField>

@Schema()
export class BrokerageField {
  // @Prop()
  // id: string;
  /**
   * Chỗ này cần xem lại về thiết kế db cho vị trí
   */

  @Prop({ required: true, enum: AllRealEstateEnum })
  realEstateType: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location'})
  location: Location;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Broker', required: false })
  broker: Broker;
}

export const BrokerageFieldSchema = SchemaFactory.createForClass(BrokerageField)
