import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Register Scam Report Portal",
  description: "Tạo tài khoản hệ thống báo cáo lừa đảo trực tuyến",
};

export default function LayoutRegister({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
