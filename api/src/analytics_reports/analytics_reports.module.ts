import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsReportsController } from './analytics_reports.controller';
import { AnalyticsReport, AnalyticsReportSchema } from './analytics_reports.schema';
import { AnalyticsReportsService } from './analytics_reports.service';
import { Report, ReportSchema } from '../reports/reports.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnalyticsReport.name, schema: AnalyticsReportSchema },
      { name: Report.name, schema: ReportSchema },
    ]),
  ],
  controllers: [AnalyticsReportsController],
  providers: [AnalyticsReportsService],
})
export class AnalyticsReportsModule {}
