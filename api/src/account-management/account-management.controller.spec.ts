import { Test, TestingModule } from '@nestjs/testing';
import { AccountManagementController } from './account-management.controller';
import { AccountManagementService } from './account-management.service';

describe('AccountManagementController', () => {
  let controller: AccountManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountManagementController],
      providers: [AccountManagementService],
    }).compile();

    controller = module.get<AccountManagementController>(
      AccountManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
