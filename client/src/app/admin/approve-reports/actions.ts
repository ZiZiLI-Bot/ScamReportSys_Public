"use server";

import { TReport } from "@/lib/Types";
import { SV_Http, TRes } from "@/utils/Http";
import { revalidateTag } from "next/cache";

export const approveReports = async (_id: string, type: string): Promise<TRes<TReport>> => {
  try {
    const res = await SV_Http.patch<TRes<TReport>>(`/reports/${_id}`, { status: type });
    revalidateTag("reports");
    return res.data;
  } catch (error) {
    throw new Error("Lỗi hệ thống");
  }
};
