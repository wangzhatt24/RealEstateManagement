import { Test, TestingModule } from '@nestjs/testing';
import { AccountStateManagementService } from './account-state-management.service';

describe('AccountStateManagementService', () => {
  let service: AccountStateManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountStateManagementService],
    }).compile();

    service = module.get<AccountStateManagementService>(AccountStateManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
