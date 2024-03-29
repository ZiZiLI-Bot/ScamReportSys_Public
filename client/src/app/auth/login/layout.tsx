import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login Scam Report Portal",
  description: "Đăng nhập vào hệ thống báo cáo lừa đảo trực tuyến",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
