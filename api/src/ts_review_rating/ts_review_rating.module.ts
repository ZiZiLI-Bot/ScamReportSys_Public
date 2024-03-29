import { Module } from '@nestjs/common';
import { TsReviewRatingService } from './ts_review_rating.service';
import { TsReviewRatingController } from './ts_review_rating.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TSReviewRating, TSReviewRatingSchema } from './ts_review_rating.schema';
import { TSReview, TSReviewSchema } from '../ts_review/ts_review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TSReviewRating.name, schema: TSReviewRatingSchema },
      { name: TSReview.name, schema: TSReviewSchema },
    ]),
  ],
  controllers: [TsReviewRatingController],
  providers: [TsReviewRatingService],
})
export class TsReviewRatingModule {}
