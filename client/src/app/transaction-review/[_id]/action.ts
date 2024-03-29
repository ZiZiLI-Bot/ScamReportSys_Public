"use server";

import { TTSRating } from "@/lib/Types/TSRating.types";
import { SV_Http, TRes } from "@/utils/Http";
import { revalidateTag } from "next/cache";

export const createNewTSRating = async (rating: TTSRating): Promise<TRes<TTSRating>> => {
  try {
    const { data: TSRating } = await SV_Http.post<TRes<TTSRating>>(`/tsreview-rating`, rating);
    revalidateTag(rating.TSReviewId.toString()); // Ensure TSReviewId is of type string
    return TSRating;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
