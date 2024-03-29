import { Rule } from "antd/es/form";

export class VALIDATION_RULES {
  static fullName: Rule[] = [{ required: true, message: "Vui lòng nhập tên người mà bạn giao dịch!" }];
  static bankName: Rule[] = [{ required: true, message: "Vui lòng nhập tên ngân hàng!" }];
  static bankAccount: Rule[] = [{ required: true, message: "Vui lòng nhập số tài khoản!" }];
  static comment: Rule[] = [{ required: true, message: "Hãy để lại một vài nhận xét của bạn!" }];
}

export type TNewReviewForm = {
  userCreated?: string;
  TSReviewId?: string;
  fullName?: string;
  bank_name: string;
  bank_account: string;
  phoneNumber?: string;
  nameUserComment?: string;
  rating: number;
  comment: string;
};
