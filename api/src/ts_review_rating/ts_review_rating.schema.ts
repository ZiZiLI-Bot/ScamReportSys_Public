import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TSReviewRatingDocument = HydratedDocument<TSReviewRating>;

@Schema({ timestamps: true })
export class TSReviewRating {
  _id: string;

  @Prop({ default: 'Anonymous' })
  fullName: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'TSReview' })
  TSReviewId: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true, default: 0 })
  rating: number;
}

export const TSReviewRatingSchema = SchemaFactory.createForClass(TSReviewRating);
