import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument } from "mongoose";
import { User } from "schemas/user.schema";
import { Post } from "./post.schema";

export type UserSavePostsDocument = HydratedDocument<UserSavePosts>

@Schema({ timestamps: true })
export class UserSavePosts {
  // @Prop()
  // id: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  post: Post;
}

export const UserSavePostsSchema = SchemaFactory.createForClass(UserSavePosts)

