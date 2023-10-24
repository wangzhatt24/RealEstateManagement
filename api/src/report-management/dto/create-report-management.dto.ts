import { ApiProperty } from "@nestjs/swagger";
import { ReportDetailt } from "schemas/report/report-detailt.schema";
import { Reporter } from "schemas/report/reporter.schema";
import { ReporterDto } from "./create-reporter.dto";
import { ReportDetailtDto } from "./create-report-detailt.dto";

export class CreateReportManagementDto {
  @ApiProperty({ type: 'string' })
  postId: string;

  @ApiProperty({ type: 'string' })
  userId?: string;

  @ApiProperty({ type: ReporterDto })
  reporter: Reporter;

  @ApiProperty({ type: ReportDetailtDto })
  reportDetailt: ReportDetailt;
}
