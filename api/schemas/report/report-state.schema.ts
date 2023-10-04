import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ReportStateEnum } from "common/enums/report-state.enum";
import mongoose, { Date, HydratedDocument } from "mongoose";

export type ReportStateDocument = HydratedDocument<ReportState>

@Schema({ timestamps: true })
export class ReportState {
  // @Prop()
  // id: string;

  @Prop({ required: true })
  state: ReportStateEnum;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: true })
  report: Report;
}

export const ReportStateSchema = SchemaFactory.createForClass(ReportState)

