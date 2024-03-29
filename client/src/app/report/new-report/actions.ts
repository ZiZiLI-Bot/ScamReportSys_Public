"use server";
import { SV_Http, TRes } from "@/utils/Http";
import { TReportForm } from "./constants";
import { revalidateTag } from "next/cache";
import { TReport } from "@/lib/Types";

export const createReport = async (values: TReportForm): Promise<TRes<TReport>> => {
  try {
    const { data: newReport } = await SV_Http.post<TRes<TReport>>("/reports", values);
    revalidateTag("reports");
    return newReport;
  } catch (err) {
    throw new Error(String(err));
  }
};
