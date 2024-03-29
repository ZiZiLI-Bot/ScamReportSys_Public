import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ReportCommentsDocument = HydratedDocument<ReportComments>;

@Schema({ timestamps: true })
export class ReportComments {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  comment: string;
  @Prop({ default: [] })
  upvote: mongoose.Types.ObjectId[];
  @Prop({ default: [] })
  downvote: mongoose.Types.ObjectId[];
  @Prop()
  reply: mongoose.Types.ObjectId;
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Report' })
  report: mongoose.Types.ObjectId;
}

export const ReportCommentsSchema = SchemaFactory.createForClass(ReportComments);
