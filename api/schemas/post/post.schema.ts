import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument } from "mongoose";
import { User } from "schemas/user.schema";

export type PostDocument = HydratedDocument<Post>

@Schema({ timestamps: true })
export class Post {
  // @Prop()
  // id: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Post)
