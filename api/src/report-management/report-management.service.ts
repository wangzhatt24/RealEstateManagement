import { HttpStatus, Inject, Injectable, Post, forwardRef } from '@nestjs/common';
import { CreateReportManagementDto } from './dto/create-report-management.dto';
import { UpdateReportManagementDto } from './dto/update-report-management.dto';
import { Reporter } from 'schemas/report/reporter.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Report } from 'schemas/report/report.schema';
import { Model } from 'mongoose';
import { ReportDetailt } from 'schemas/report/report-detailt.schema';
import { ReportState } from 'schemas/report/report-state.schema';
import { UserManagementService } from 'src/user-management/user-management.service';
import { defaultReportState } from 'configs/configs';
import { RealEstatePost } from 'schemas/post/post.schema';
import { ResponseCommon } from 'common/interfaces/response-common/response.dto';
import { User } from 'schemas/user.schema';
import AccountPayload from 'common/interfaces/account-payload/account.payload';
import { AccountManagementService } from 'src/account-management/account-management.service';

@Injectable()
export class ReportManagementService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<Report>,
    @InjectModel(Reporter.name) private reporterModel: Model<Reporter>,
    @InjectModel(ReportDetailt.name) private reportDetailtModel: Model<ReportDetailt>,
    @InjectModel(ReportState.name) private reportStateModel: Model<ReportState>,
    @InjectModel(RealEstatePost.name) private realEstatePostModel: Model<RealEstatePost>,
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => UserManagementService)) private userService: UserManagementService,
    @Inject(forwardRef(() => AccountManagementService)) private accountService: AccountManagementService
  ) { }

  async create(dto: CreateReportManagementDto) {
    const newReport = new this.reportModel(dto);
    const newReporter = new this.reporterModel(dto.reporter);
    const newReportDetailt = new this.reportDetailtModel(dto.reportDetailt);
    const newReportState = new this.reportStateModel(defaultReportState);

    // link section
    newReport.reporter = newReporter;
    newReport.reportDetailt = newReportDetailt;
    newReport.reportState = newReportState;

    newReporter.report = newReport;
    newReportDetailt.report = newReport;
    newReportState.report = newReport;

    if(dto.userId) {
      const findUser = await this.userService.findOne(dto.userId);

      newReport.user = findUser;

      findUser.reports.push(newReport);

      findUser.save();
    }

    if(dto.postId) {
      const findPost = await this.realEstatePostModel.findById(dto.postId);

      newReport.post = findPost;

      findPost.reports.push(newReport);

      findPost.save();
    }

    // save section
    await newReport.save();
    await newReporter.save();
    await newReportDetailt.save();
    await newReportState.save();

    return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", newReport.id);
  }

  async findAll() {
    const findResult = await this.reportModel.find().populate({
      path: 'reporter reportDetailt reportState'
    })

    if(findResult) {
      return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", findResult);
    } else {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "ERROR");
    }
  }

  async findOne(id: string) {
    const findResult = await this.reportModel.findOne({ _id: id }).populate({
      path: 'reporter reportDetailt reportState'
    })

    if(findResult) {
      return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", findResult);
    } else {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "ERROR");
    }
  }

  async update(dto: UpdateReportManagementDto) {
    const findReport = await this.reportModel.findOne({ _id: dto.reportId });

    // xóa state cũ
    await this.reportStateModel.findOneAndDelete({
      _id: findReport.reportState
    })


    const newState = new this.reportStateModel(dto.reportState);
    findReport.reportState = newState;

    newState.report = findReport;

    await findReport.save();
    await newState.save();

    return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", newState.id);
  }
}
