import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { District } from "./district.schema";

export type WardDocument = HydratedDocument<Ward>

@Schema()
export class Ward {
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'District'})
  district: District;
}

export const WardSchema = SchemaFactory.createForClass(Ward)