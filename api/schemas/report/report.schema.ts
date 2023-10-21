import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument } from "mongoose";
import { RealEstatePost } from "schemas/post/post.schema";

export type ReportDocument = HydratedDocument<Report>

@Schema({ timestamps: true })
export class Report {
  // @Prop()
  // id: string;
  
  // thiếu tham chiếu tới post
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  post: RealEstatePost;
}

export const ReportSchema = SchemaFactory.createForClass(Report)

