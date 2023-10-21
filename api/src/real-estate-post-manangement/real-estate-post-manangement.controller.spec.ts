import { Test, TestingModule } from '@nestjs/testing';
import { RealEstatePostManangementController } from './real-estate-post-manangement.controller';
import { RealEstatePostManangementService } from './real-estate-post-manangement.service';

describe('RealEstatePostManangementController', () => {
  let controller: RealEstatePostManangementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealEstatePostManangementController],
      providers: [RealEstatePostManangementService],
    }).compile();

    controller = module.get<RealEstatePostManangementController>(RealEstatePostManangementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
