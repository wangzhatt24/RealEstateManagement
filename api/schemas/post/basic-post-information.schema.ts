import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RealEstateType } from "enums/real-estate-type.enum";
import { saleOrRental } from "enums/sale-or-rental.enum";
import mongoose, { HydratedDocument } from "mongoose";
import { Post } from "./post.schema";

export type BasicPostInformationDocument = HydratedDocument<BasicPostInformation>

@Schema()
export class BasicPostInformation {
  // @Prop()
  // id: string;

  @Prop({ required: true })
  saleOrRentalType: saleOrRental;

  @Prop({ required: true })
  realEstateType: RealEstateType;

  @Prop({ required: true })
  location: Location;

  @Prop({ required: true })
  detailtAddress: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;
}

export const BasicPostInformationSchema = SchemaFactory.createForClass(BasicPostInformation)