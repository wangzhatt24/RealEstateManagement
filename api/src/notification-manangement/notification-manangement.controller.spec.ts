import { Test, TestingModule } from '@nestjs/testing';
import { NotificationManangementController } from './notification-manangement.controller';
import { NotificationManangementService } from './notification-manangement.service';

describe('NotificationManangementController', () => {
  let controller: NotificationManangementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationManangementController],
      providers: [NotificationManangementService],
    }).compile();

    controller = module.get<NotificationManangementController>(NotificationManangementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
