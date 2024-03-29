import { TUser } from ".";

export type TReport_comment = {
  _id: string;
  comment: string;
  upvote: string[];
  downvote: string[];
  reply?: string;
  user: TUser;
  report: string;
  createdAt: string;
  updatedAt: string;
};
