import { TReport } from ".";

export type TGAReport = {
  _id: string;
  report: TReport;
  total_views: number;
  views_day: number;
  views_month: number;
  views_year: number;
  shares: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
};
