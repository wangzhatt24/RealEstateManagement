import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RealEstateType } from "common/enums/real-estate-type.enum";
import { saleOrRental } from "common/enums/sale-or-rental.enum";
import mongoose, { HydratedDocument } from "mongoose";
import { RealEstatePost } from "./post.schema";
import { Location } from "schemas/location/location.schema";

export type BasicPostInformationDocument = HydratedDocument<BasicPostInformation>

@Schema()
export class BasicPostInformation {
  // @Prop()
  // id: string;

  @Prop({ required: true })
  saleOrRentalType: saleOrRental;

  @Prop({ required: true })
  realEstateType: RealEstateType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location' , required: true })
  location: Location;

  @Prop({ required: true })
  detailtAddress: string;

  @Prop({ required: true })
  postTitle: string;

  @Prop()
  referencePrice: number;

  @Prop()
  acreage: number;

  @Prop()
  bedRooms: number;

  @Prop()
  direction: string;

  @Prop()
  toilets: number;

  @Prop()
  interior: string;

  @Prop()
  legalInformation: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  realEstateImages: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: RealEstatePost;
}

export const BasicPostInformationSchema = SchemaFactory.createForClass(BasicPostInformation)