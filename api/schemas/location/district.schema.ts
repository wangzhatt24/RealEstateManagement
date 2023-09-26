import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ProvinceOrCity } from "./province-or-city.schema";

export type DistrictDocument = HydratedDocument<District>

@Schema()
export class District {
  // @Prop()
  // id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: number;

  @Prop({ required: true })
  codename: string;

  @Prop({ required: true })
  division_type: string;

  @Prop({ required: true })
  short_codename: string;

  // nối về provinceOrcity
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProvinceOrCity'})
  provinceOrCity: ProvinceOrCity
}

export const DistrictSchema = SchemaFactory.createForClass(District)