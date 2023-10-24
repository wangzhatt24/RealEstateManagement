import { Test, TestingModule } from '@nestjs/testing';
import { BrokerManagementController } from './broker-management.controller';
import { BrokerManagementService } from './broker-management.service';

describe('BrokerManagementController', () => {
  let controller: BrokerManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrokerManagementController],
      providers: [BrokerManagementService],
    }).compile();

    controller = module.get<BrokerManagementController>(BrokerManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
