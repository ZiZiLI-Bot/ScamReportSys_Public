import { type TUser } from "./User.type";

export type TScammer = {
  _id: string;
  userCreated: TUser;
  name: string;
  gender: string;
  birthYear?: number;
  phoneNumber?: string;
  address?: string;
  email?: string;
  bankAccount: string;
  bankName: string;
  socialNetwork?: string[];
  createdAt?: string;
  updatedAt?: string;
};
