import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsReportsController } from './analytics_reports.controller';
import { AnalyticsReportsService } from './analytics_reports.service';

describe('AnalyticsReportsController', () => {
  let controller: AnalyticsReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsReportsController],
      providers: [AnalyticsReportsService],
    }).compile();

    controller = module.get<AnalyticsReportsController>(AnalyticsReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
