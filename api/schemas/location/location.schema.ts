import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ProvinceOrCity } from "./province-or-city.schema";
import { District } from "./district.schema";
import { Ward } from "./ward.schema";

export type LocationDocument = HydratedDocument<Location>

@Schema()
export class Location {
  // @Prop()
  // id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProvinceOrCity'})
  provinceOrCity: ProvinceOrCity;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'District'})
  district: District;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ward'})
  ward: Ward;
}

export const LocationSchema = SchemaFactory.createForClass(Location)