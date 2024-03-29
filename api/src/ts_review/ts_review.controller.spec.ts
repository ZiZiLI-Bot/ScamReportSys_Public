import { Test, TestingModule } from '@nestjs/testing';
import { TsReviewController } from './ts_review.controller';
import { TsReviewService } from './ts_review.service';

describe('TsReviewController', () => {
  let controller: TsReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsReviewController],
      providers: [TsReviewService],
    }).compile();

    controller = module.get<TsReviewController>(TsReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
