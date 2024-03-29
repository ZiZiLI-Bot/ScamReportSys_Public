import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { AnalyticsReport } from '../analytics_reports/analytics_reports.schema';
import { GA_TSReview } from '../analytics_tsreview/analytics_tsreview.schema';

@Injectable()
export class CronTasksService {
  private readonly logger = new Logger(CronTasksService.name);
  constructor(
    @InjectModel(AnalyticsReport.name) private AnalyticsReportModel: Model<AnalyticsReport>,
    @InjectModel(GA_TSReview.name) private GA_TSReviewModel: Model<GA_TSReview>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM) // every day at 1AM
  async ResetViewsDay() {
    await this.AnalyticsReportModel.updateMany({}, { $set: { views_day: 0 } }).exec();
    await this.GA_TSReviewModel.updateMany({}, { $set: { views_day: 0 } }).exec();

    this.logger.debug('UPDATE views every day at 1AM');
  }

  @Cron('0 0 * * 1') // every Monday at 00:00
  async ResetViewsWeek() {
    await this.AnalyticsReportModel.updateMany({}, { $set: { views_week: 0 } }).exec();
    await this.GA_TSReviewModel.updateMany({}, { $set: { views_week: 0 } }).exec();
    this.logger.debug('RESET views_week every Monday at 00:00');
  }

  @Cron('0 0 1 * *') // every 1st of month at 00:00
  async ResetViewsMonth() {
    await this.AnalyticsReportModel.updateMany({}, { $set: { views_month: 0 } }).exec();
    await this.GA_TSReviewModel.updateMany({}, { $set: { views_month: 0 } }).exec();
    this.logger.debug('RESET views_month every 1st of month at 00:00');
  }

  @Cron('0 0 1 1 *') // every 1st of January at 00:00
  async ResetViewsYear() {
    await this.AnalyticsReportModel.updateMany({}, { $set: { views_year: 0 } }).exec();
    await this.GA_TSReviewModel.updateMany({}, { $set: { views_year: 0 } }).exec();
    this.logger.debug('RESET views_year every 1st of January at 00:00');
  }
}
