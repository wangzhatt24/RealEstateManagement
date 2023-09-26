import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProvinceOrCityDocument = HydratedDocument<ProvinceOrCity>

@Schema()
export class ProvinceOrCity {
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
}

export const ProvinceOrCitySchema = SchemaFactory.createForClass(ProvinceOrCity)