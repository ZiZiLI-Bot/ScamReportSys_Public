import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type GA_TSReviewDocument = HydratedDocument<GA_TSReview>;

@Schema({ timestamps: true })
export class GA_TSReview {
  _id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'TSReview' })
  TSReview: string;

  @Prop({ required: true, type: Number, default: 0 })
  total_views: number;

  @Prop({ required: true, type: Number, default: 0 })
  views_day: number;

  @Prop({ required: true, type: Number, default: 0 })
  views_week: number;

  @Prop({ required: true, type: Number, default: 0 })
  views_month: number;

  @Prop({ required: true, type: Number, default: 0 })
  views_year: number;

  @Prop({ required: true, type: Number, default: 0 })
  shares: number;

  @Prop({ required: true, type: Number, default: 0 })
  likes: number;
}

export const GA_TSReviewSchema = SchemaFactory.createForClass(GA_TSReview);
