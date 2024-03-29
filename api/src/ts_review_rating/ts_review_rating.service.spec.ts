import { Test, TestingModule } from '@nestjs/testing';
import { TsReviewRatingService } from './ts_review_rating.service';

describe('TsReviewRatingService', () => {
  let service: TsReviewRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsReviewRatingService],
    }).compile();

    service = module.get<TsReviewRatingService>(TsReviewRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
