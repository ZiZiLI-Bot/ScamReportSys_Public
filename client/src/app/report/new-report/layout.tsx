import { Header } from "@/components/Header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tạo báo cáo mới",
  description: "Tạo mới báo cáo",
};

export default function NewReportLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative bg-slate-50">
      <Header style={{ position: "fixed" }} />
      {children}
    </main>
  );
}
