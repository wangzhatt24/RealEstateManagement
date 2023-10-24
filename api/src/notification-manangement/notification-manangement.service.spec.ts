import { Test, TestingModule } from '@nestjs/testing';
import { NotificationManangementService } from './notification-manangement.service';

describe('NotificationManangementService', () => {
  let service: NotificationManangementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationManangementService],
    }).compile();

    service = module.get<NotificationManangementService>(NotificationManangementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
