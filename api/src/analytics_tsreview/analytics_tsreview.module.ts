import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsTSReviewController } from './analytics_tsreview.controller';
import { GA_TSReview, GA_TSReviewSchema } from './analytics_tsreview.schema';
import { AnalyticsTSReviewService } from './analytics_tsreview.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: GA_TSReview.name, schema: GA_TSReviewSchema }])],
  controllers: [AnalyticsTSReviewController],
  providers: [AnalyticsTSReviewService],
})
export class AnalyticsTSReviewModule {}
