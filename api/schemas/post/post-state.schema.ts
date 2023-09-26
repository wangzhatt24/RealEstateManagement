import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PostStateEnum } from "enums/post-state.enum";
import mongoose, { Date, HydratedDocument } from "mongoose";
import { User } from "schemas/user.schema";
import { Post } from "./post.schema";

export type PostStateDocument = HydratedDocument<PostState>

@Schema({ timestamps: true })
export class PostState {
  // @Prop()
  // id: string;

  @Prop({ required: true })
  state: PostStateEnum;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  post: Post;
}

export const PostStateSchema = SchemaFactory.createForClass(PostState)
