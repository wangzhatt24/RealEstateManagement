import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RealEstateType } from "enums/real-estate-type.enum";
import { saleOrRental } from "enums/sale-or-rental.enum";
import mongoose, { HydratedDocument } from "mongoose";
import { Post } from "./post.schema";

export type ContactPostDocument = HydratedDocument<ContactPost>

@Schema()
export class ContactPost {
  // @Prop()
  // id: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;
}

export const ContactPostSchema = SchemaFactory.createForClass(ContactPost)