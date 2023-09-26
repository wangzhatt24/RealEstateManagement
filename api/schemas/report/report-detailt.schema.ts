import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument } from "mongoose";

export type ReportDetailtDocument = HydratedDocument<ReportDetailt>

@Schema({ timestamps: true })
export class ReportDetailt {
  // @Prop()
  // id: string;

  @Prop({ required: true })
  reportTitle: string;

  @Prop({ required: true })
  reportContent: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: true })
  report: Report;
}

export const ReportDetailtSchema = SchemaFactory.createForClass(ReportDetailt)

