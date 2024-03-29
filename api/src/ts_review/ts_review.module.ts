import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GA_TSReview, GA_TSReviewSchema } from '../analytics_tsreview/analytics_tsreview.schema';
import { TSReviewController } from './ts_review.controller';
import { TSReview, TSReviewSchema } from './ts_review.schema';
import { TSReviewService } from './ts_review.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TSReview.name, schema: TSReviewSchema },
      { name: GA_TSReview.name, schema: GA_TSReviewSchema },
    ]),
  ],
  controllers: [TSReviewController],
  providers: [TSReviewService],
})
export class TsReviewModule {}
