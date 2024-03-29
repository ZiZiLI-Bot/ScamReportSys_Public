import { type TScammer } from "./Scammer.type";
import { type TUser } from "./User.type";

export type TReport = {
  _id: string;
  userCreated: TUser;
  scammer_name: string;
  scammer_gender: string;
  scammer_email: string;
  scammer_phone: string;
  scammer_bankName: string;
  scammer_bankAccount: string;
  scammer_socialNetwork: string[];
  reportType: string;
  description: string;
  status?: string;
  hidden?: boolean;
  evidencePhoto?: string[];
  createdAt?: string;
  updatedAt?: string;
};
