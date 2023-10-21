import { Test, TestingModule } from '@nestjs/testing';
import { RealEstatePostManangementService } from './real-estate-post-manangement.service';

describe('RealEstatePostManangementService', () => {
  let service: RealEstatePostManangementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealEstatePostManangementService],
    }).compile();

    service = module.get<RealEstatePostManangementService>(RealEstatePostManangementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
