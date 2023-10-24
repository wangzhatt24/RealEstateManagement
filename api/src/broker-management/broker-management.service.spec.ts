import { Test, TestingModule } from '@nestjs/testing';
import { BrokerManagementService } from './broker-management.service';

describe('BrokerManagementService', () => {
  let service: BrokerManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrokerManagementService],
    }).compile();

    service = module.get<BrokerManagementService>(BrokerManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
