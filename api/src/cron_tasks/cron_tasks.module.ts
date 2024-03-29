import { Module } from '@nestjs/common';
import { CronTasksService } from './cron_tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsReport, AnalyticsReportSchema } from '../analytics_reports/analytics_reports.schema';
import { GA_TSReview, GA_TSReviewSchema } from '../analytics_tsreview/analytics_tsreview.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnalyticsReport.name, schema: AnalyticsReportSchema },
      { name: GA_TSReview.name, schema: GA_TSReviewSchema },
    ]),
  ],
  providers: [CronTasksService],
})
export class CronTasksModule {}
