import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsTSReviewService } from './analytics_tsreview.service';

describe('AnalyticsTSReviewService', () => {
  let service: AnalyticsTSReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyticsTSReviewService],
    }).compile();

    service = module.get<AnalyticsTSReviewService>(AnalyticsTSReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
