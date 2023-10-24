import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PostStateEnum } from "common/enums/post-state.enum";
import mongoose, { Date, HydratedDocument } from "mongoose";
import { User } from "schemas/user.schema";
import { RealEstatePost } from "./post.schema";

export type PostStateDocument = HydratedDocument<PostState>

@Schema({ timestamps: true })
export class PostState {
  // @Prop()
  // id: string;

  @Prop({ required: true, type: String })
  state: PostStateEnum;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  post: RealEstatePost;
}

export const PostStateSchema = SchemaFactory.createForClass(PostState)
