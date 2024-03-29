import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsController } from './reports.controller';
import { Report, ReportSchema } from './reports.schema';
import { ReportsService } from './reports.service';
import { AnalyticsReport, AnalyticsReportSchema } from '../analytics_reports/analytics_reports.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: AnalyticsReport.name, schema: AnalyticsReportSchema },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
