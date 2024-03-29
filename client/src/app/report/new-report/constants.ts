import { Rule } from "antd/es/form";
import { TReport, TScammer } from "@/lib/Types";

export const genderOptions = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
];

// export type TReportForm = Omit<TReport, "userCreated" | "scammer" | "_id"> & Omit<TScammer, "_id" | "userCreated">;

export class VALIDATION_RULES {
  static SCAMMER_NAME: Rule[] = [{ required: true, message: "Vui lòng nhập tên người lừa đảo!" }];
  static SCAMMER_EMAIL: Rule[] = [{ type: "email", message: "Email không hợp lệ" }];
  static SCAMMER_PHONE: Rule[] = [{ pattern: /^\d{10,11}$/, message: "Số điện thoại không hợp lệ" }];
  static BANK_NAME: Rule[] = [{ required: true, message: "Vui lòng nhập tên ngân hàng" }];
  static BANK_ACCOUNT: Rule[] = [{ required: true, message: "Vui lòng nhập số tài khoản" }];
  static REPORT_TYPE: Rule[] = [{ required: true, message: "Vui lòng nhập loại báo cáo" }];
  static REPORT_DETAIL: Rule[] = [{ required: true, message: "Vui lòng nhập nội dung chi tiết" }];
}

export type TReportForm = {
  userCreated?: string;
  scammer_name: string;
  scammer_gender: string;
  scammer_email: string;
  scammer_phone: string;
  scammer_bankName: string;
  scammer_bankAccount: string;
  scammer_socialNetwork: string;
  reportType: string;
  description: string;
  evidencePhoto: string[];
};
