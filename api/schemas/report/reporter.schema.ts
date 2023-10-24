import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument } from "mongoose";
import { User } from "schemas/user.schema";
import { Report } from "./report.schema";

export type ReporterDocument = HydratedDocument<Reporter>

@Schema({ timestamps: true })
export class Reporter {
  // @Prop()
  // id: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: true })
  report: Report;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  user: User;
}

export const ReporterSchema = SchemaFactory.createForClass(Reporter)

