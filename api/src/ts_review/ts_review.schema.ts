import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import removeAccents from 'remove-accents';

export type TSReviewDocument = HydratedDocument<TSReview>;

@Schema({ timestamps: true })
export class TSReview {
  _id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userCreated: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  bank_account: string;

  @Prop({ required: true })
  bank_name: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: true, default: 0 })
  AV_rating: number;

  @Prop({ required: true, default: 0 })
  count_rating: number;

  @Prop({ index: 'text' })
  search_key: string;
}

export const TSReviewSchema = SchemaFactory.createForClass(TSReview);

TSReviewSchema.pre('save', function (next) {
  this.search_key = `${removeAccents(this.fullName).toLowerCase()} ${this.phoneNumber} ${removeAccents(this.bank_account).toLowerCase()}`;
  next();
});
