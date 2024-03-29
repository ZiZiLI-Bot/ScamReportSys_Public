"use server";
import { TUser } from "@/lib/Types";
import { SV_Http, TRes } from "@/utils/Http";
import { setCookie, getCookie } from "cookies-next";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export type LoginFiled = {
  email?: string;
  password?: string;
  remember?: boolean;
};

type ResLogin = {
  isBlocked: boolean;
  _id: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  user: TUser;
  access_token: string;
};

const twoWeeks = 60 * 60 * 24 * 14;
const oneDay = 60 * 60 * 24;

export async function Login(userData: LoginFiled): Promise<TRes<ResLogin>> {
  const { data: loginData } = await SV_Http.post<TRes<ResLogin>>("/auth/login", userData);
  setCookie("token", loginData.data?.access_token, {
    cookies,
    maxAge: userData.remember ? twoWeeks : oneDay,
    path: "/",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
  return loginData;
}

export async function Logout(cacheTag: string): Promise<void> {
  revalidateTag(cacheTag);
  return Promise.resolve();
}
