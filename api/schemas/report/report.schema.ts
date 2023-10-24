import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument } from "mongoose";
import { RealEstatePost } from "schemas/post/post.schema";
import { User } from "schemas/user.schema";
import { Reporter } from "./reporter.schema";
import { ReportDetailt } from "./report-detailt.schema";
import { ReportState } from "./report-state.schema";

export type ReportDocument = HydratedDocument<Report>

@Schema({ timestamps: true })
export class Report {
  // @Prop()
  // id: string;
  
  // thiếu tham chiếu tới post
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  })
  post: RealEstatePost;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    default: undefined
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reporter',
    required: false,
    default: undefined
  })
  reporter: Reporter;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReportDetailt',
    required: false,
    default: undefined
  })
  reportDetailt: ReportDetailt;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReportState',
    required: false,
    default: undefined
  })
  reportState: ReportState;
}

export const ReportSchema = SchemaFactory.createForClass(Report)

