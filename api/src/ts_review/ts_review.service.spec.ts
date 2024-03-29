import { Test, TestingModule } from '@nestjs/testing';
import { TsReviewService } from './ts_review.service';

describe('TsReviewService', () => {
  let service: TsReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsReviewService],
    }).compile();

    service = module.get<TsReviewService>(TsReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
