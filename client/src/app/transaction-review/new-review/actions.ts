"use server";

import { SV_Http, TRes } from "@/utils/Http";
import { TNewReviewForm } from "./constants";
import { TTSReview } from "@/lib/Types/TSReview.types";
import { TTSRating } from "@/lib/Types/TSRating.types";
import { revalidateTag } from "next/cache";

export const createNewReview = async (review: TNewReviewForm): Promise<TRes<TTSReview>> => {
  try {
    const { data: newReview } = await SV_Http.post<TRes<TTSReview>>("/ts_review", review);
    review.TSReviewId = newReview.data?._id;
    review.fullName = review.nameUserComment;
    delete review.nameUserComment;
    const newTSRating = await SV_Http.post<TRes<TTSRating>>(`/tsreview-rating`, review);
    revalidateTag("ts_reviews");
    return newReview;
  } catch (err) {
    throw err;
  }
};
