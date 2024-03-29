import { TUser } from ".";

export type TTSReview = {
  _id: string;
  userCreated: TUser;
  fullName: string;
  bank_account: string;
  bank_name: string;
  phoneNumber?: string;
  AV_rating: number;
  count_rating: number;
  search_key: string;
  createdAt: string;
  updatedAt: string;
};
