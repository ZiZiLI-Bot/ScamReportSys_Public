import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Báo cáo của bạn",
  description: "Chức năng báo cáo của bạn",
};

export default function UserReportLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-slate-50">{children}</main>;
}
