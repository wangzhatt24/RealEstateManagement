import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument } from "mongoose";
import { Report } from "schemas/report/report.schema";
import { User } from "schemas/user.schema";
import { UserSavePosts } from "./user-save-posts.schema";
import { PostState } from "./post-state.schema";
import { BasicPostInformation } from "./basic-post-information.schema";
import { ContactPost } from "./contact-post.schema";

export type PostDocument = HydratedDocument<RealEstatePost>

@Schema({ timestamps: false })
export class RealEstatePost {
  // @Prop()
  // id: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: false })
  report: Report;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSavePosts', required: false })
  userSavePosts: UserSavePosts;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PostState', required: false })
  postState: PostState;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'BasicPostInformation', required: false })
  basicPostInformation: BasicPostInformation;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ContactPost', required: false })
  contactPost: ContactPost;
}

export const PostSchema = SchemaFactory.createForClass(RealEstatePost)
