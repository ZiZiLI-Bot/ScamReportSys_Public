"use server";
import { TUser } from "@/lib/Types";
import { SV_Http, TRes } from "@/utils/Http";

export type RegisterFiled = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
};

type RegisterRes = {
  _id: string;
  email: string;
  role: string;
  user: string;
};

export const Register = async (data: RegisterFiled): Promise<TRes<RegisterRes>> => {
  try {
    const { data: register } = await SV_Http.post<TRes<RegisterRes>>("/auth/register", data);
    if (register.success) {
      return register;
    }
    throw new Error("Lỗi hệ thống, Vui lòng thử lại sau!");
  } catch (err: any) {
    throw new Error("Email đã tồn tại, Vui lòng thử lại với email khác!");
  }
};
