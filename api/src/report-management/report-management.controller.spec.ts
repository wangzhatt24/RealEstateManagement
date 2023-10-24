import { Test, TestingModule } from '@nestjs/testing';
import { ReportManagementController } from './report-management.controller';
import { ReportManagementService } from './report-management.service';

describe('ReportManagementController', () => {
  let controller: ReportManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportManagementController],
      providers: [ReportManagementService],
    }).compile();

    controller = module.get<ReportManagementController>(ReportManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
