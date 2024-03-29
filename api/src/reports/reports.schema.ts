import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import removeAccents from 'remove-accents';

export type ReportDocument = HydratedDocument<Report>;

@Schema({ timestamps: true })
export class Report {
  _id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userCreated: string;

  @Prop({ required: true })
  scammer_name: string;

  @Prop()
  scammer_gender: string;

  @Prop()
  scammer_email: string;

  @Prop()
  scammer_phone: string;

  @Prop({ required: true })
  scammer_bankName: string;

  @Prop({ required: true })
  scammer_bankAccount: string;

  @Prop()
  scammer_socialNetwork: string[];

  @Prop({ required: true })
  reportType: string;

  @Prop()
  description: string;
  @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
  status: string;

  @Prop({ default: false })
  hidden: boolean;

  @Prop()
  evidencePhoto: string[];

  @Prop({ index: 'text' })
  searchKey: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);

ReportSchema.pre('save', function (next) {
  this.searchKey = `${removeAccents(this.scammer_name).toLowerCase()} ${this.scammer_phone} ${removeAccents(this.scammer_bankAccount).toLowerCase()}`;
  next();
});
