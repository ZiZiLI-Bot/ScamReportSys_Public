import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsTSReviewController } from './analytics_tsreview.controller';
import { AnalyticsTSReviewService } from './analytics_tsreview.service';

describe('AnalyticsTsreviewController', () => {
  let controller: AnalyticsTSReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsTSReviewController],
      providers: [AnalyticsTSReviewService],
    }).compile();

    controller = module.get<AnalyticsTSReviewController>(AnalyticsTSReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
