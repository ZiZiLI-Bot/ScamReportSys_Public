"use server";

import { TReport } from "@/lib/Types";
import { SV_Http, TRes } from "@/utils/Http";
import { revalidateTag } from "next/cache";

type TUpdateStatus = {
  message: string;
  description: string;
};

export const updateStatus = async (
  value: string | boolean,
  type: "status" | "hidden",
  report_id: string,
): Promise<TUpdateStatus> => {
  switch (type) {
    case "status":
      try {
        const { data: updateStatus } = await SV_Http.patch<TRes<TReport>>(`/reports/${report_id}`, {
          status: value,
        });
        if (updateStatus.success) {
          revalidateTag("reports");
          return Promise.resolve<TUpdateStatus>({
            message: "Cập nhật trạng thái bài đăng thành công",
            description: `Trạng thái: ${value}`,
          } as TUpdateStatus);
        }
      } catch (error: any) {
        return Promise.reject<TUpdateStatus>(new Error(error.message));
      }
      break;
    case "hidden":
      try {
        const { data: updateHidden } = await SV_Http.patch<TRes<TReport>>(`/reports/${report_id}`, {
          hidden: value,
        });
        if (updateHidden.success) {
          revalidateTag("reports");
          return Promise.resolve<TUpdateStatus>({
            message: "Cập nhật trạng thái ẩn bài đăng thành công",
            description: `Đã ${value ? "ẩn" : "hiện"} bài đăng`,
          } as TUpdateStatus);
        }
      } catch (error: any) {
        return Promise.reject<TUpdateStatus>(new Error(error.message));
      }
      break;
    default:
      break;
  }
  return Promise.reject<TUpdateStatus>(new Error("Invalid type"));
};
