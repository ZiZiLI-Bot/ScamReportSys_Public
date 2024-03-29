import { TTSReview } from "./TSReview.types";

export type TTSRating = {
  _id: string;
  fullName: string;
  comment: string;
  TSReviewId: TTSReview | string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};
