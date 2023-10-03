import { Test, TestingModule } from '@nestjs/testing';
import { AccountStateManagementController } from './account-state-management.controller';
import { AccountStateManagementService } from './account-state-management.service';

describe('AccountStateManagementController', () => {
  let controller: AccountStateManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountStateManagementController],
      providers: [AccountStateManagementService],
    }).compile();

    controller = module.get<AccountStateManagementController>(AccountStateManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
