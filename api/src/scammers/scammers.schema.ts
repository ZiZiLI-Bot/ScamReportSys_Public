import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ScammerDocument = HydratedDocument<Scammer>;

@Schema({ timestamps: true })
export class Scammer {
  _id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userCreated: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  name: string;
  @Prop({ enum: ['male', 'female', 'other'] })
  gender: string;
  @Prop()
  birthYear: number;
  @Prop()
  phoneNumber: string;
  @Prop()
  address: string;
  @Prop()
  email: string;
  @Prop()
  bankAccount: string;
  @Prop()
  bankName: string;
  @Prop()
  socialNetwork: string[];
}

export const ScammerSchema = SchemaFactory.createForClass(Scammer);
