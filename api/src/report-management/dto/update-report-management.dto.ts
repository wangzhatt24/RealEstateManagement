import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ReportDetailt } from 'schemas/report/report-detailt.schema';
import { Reporter } from 'schemas/report/reporter.schema';
import { ReportDetailtDto } from './create-report-detailt.dto';
import { ReporterDto } from './create-reporter.dto';
import { ReportState } from 'schemas/report/report-state.schema';
import { ReportStateEnum } from 'common/enums/report-state.enum';

export class UpdateReportStateDto {
  @ApiProperty({ enum: ReportStateEnum })
  state: ReportStateEnum;
}

export class UpdateReportManagementDto {
  @ApiProperty({ type: 'string' })
  reportId: string;

  @ApiProperty({ type: UpdateReportStateDto })
  reportState: ReportState;
}


