import { ApiProperty } from "@nestjs/swagger";

export class ReportDetailtDto {
  @ApiProperty({ type: 'string' })
  reportTitle: string;

  @ApiProperty({ type: 'string' })
  reportContent: string;
}