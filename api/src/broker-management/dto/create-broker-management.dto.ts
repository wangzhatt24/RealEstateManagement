import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { BrokerageField } from "schemas/broker/brokerage-field.schema";
import { CreateBrokerFieldDto } from "./create-broker-field.dto";

export class CreateBrokerManagementDto {
  // id

  @IsString()
  @ApiProperty({ type: 'string' })
  selfIntroducing: string;

  @IsString()
  @ApiProperty({ type: 'string' })
  userId: string;

  @ApiProperty({ type: CreateBrokerFieldDto })
  brokerageField: BrokerageField;
}
