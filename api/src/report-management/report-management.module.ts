import { Module, forwardRef } from '@nestjs/common';
import { ReportManagementService } from './report-management.service';
import { ReportManagementController } from './report-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reporter, ReporterSchema } from 'schemas/report/reporter.schema';
import { ReportDetailt, ReportDetailtSchema } from 'schemas/report/report-detailt.schema';
import { ReportState, ReportStateSchema } from 'schemas/report/report-state.schema';
import { Report, ReportSchema } from 'schemas/report/report.schema';
import { UserManagementModule } from 'src/user-management/user-management.module';
import { PostSchema, RealEstatePost } from 'schemas/post/post.schema';
import { User, UserSchema } from 'schemas/user.schema';
import { AccountManagementModule } from 'src/account-management/account-management.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema},
      { name: Reporter.name, schema: ReporterSchema },
      { name: ReportDetailt.name, schema: ReportDetailtSchema },
      { name: ReportState.name, schema: ReportStateSchema },
      { name: RealEstatePost.name, schema: PostSchema},
      { name: User.name, schema: UserSchema},
    ]),
    forwardRef(() => UserManagementModule),
    forwardRef(() => AccountManagementModule)
  ],
  controllers: [ReportManagementController],
  providers: [ReportManagementService]
})
export class ReportManagementModule {}
