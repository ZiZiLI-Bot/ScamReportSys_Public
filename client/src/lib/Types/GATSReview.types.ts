import { TTSReview } from "./TSReview.types";

export type GA_TSReview = {
  _id: string;
  TSReview: TTSReview;
  total_views: number;
  views_day: number;
  views_week: number;
  views_month: number;
  views_year: number;
  shares: number;
  likes: number;
};
