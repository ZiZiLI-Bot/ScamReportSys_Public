import { Test, TestingModule } from '@nestjs/testing';
import { TsReviewRatingController } from './ts_review_rating.controller';
import { TsReviewRatingService } from './ts_review_rating.service';

describe('TsReviewRatingController', () => {
  let controller: TsReviewRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsReviewRatingController],
      providers: [TsReviewRatingService],
    }).compile();

    controller = module.get<TsReviewRatingController>(TsReviewRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
