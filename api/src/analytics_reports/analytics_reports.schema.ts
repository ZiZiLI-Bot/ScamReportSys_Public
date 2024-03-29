import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AnalyticsReportDocument = HydratedDocument<AnalyticsReport>;

@Schema({ timestamps: true })
export class AnalyticsReport {
  _id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Report' })
  report: string;

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

export const AnalyticsReportSchema = SchemaFactory.createForClass(AnalyticsReport);
