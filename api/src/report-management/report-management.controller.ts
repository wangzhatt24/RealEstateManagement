import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportManagementService } from './report-management.service';
import { CreateReportManagementDto } from './dto/create-report-management.dto';
import { UpdateReportManagementDto } from './dto/update-report-management.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'common/decorators/public.decorator';
import { Roles } from 'common/decorators/role.decorator';
import { Role } from 'common/enums/role.enum';

@ApiTags("Report Management")
@ApiBearerAuth()
@Controller('report-management')
export class ReportManagementController {
  constructor(private readonly reportManagementService: ReportManagementService) {}

  @Post('/new-report')
  create(@Body() dto: CreateReportManagementDto) {
    return this.reportManagementService.create(dto);
  }

  @Get('/reports')
  findAll() {
    return this.reportManagementService.findAll();
  }

  @Get('/report/:id')
  findOne(@Param('id') id: string) {
    return this.reportManagementService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch('/report-state')
  update(@Body() dto: UpdateReportManagementDto) {
    return this.reportManagementService.update(dto);
  }
}
