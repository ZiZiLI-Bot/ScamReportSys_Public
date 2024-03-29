import { Header } from "@/components/Header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tạo mới bài đánh giá giao dịch",
  description: "Tạo mới bài đánh giá giao dịch của bạn với người dùng khác",
};

export default function CreateTransactionReviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative bg-slate-50">
      <Header style={{ position: "fixed" }} />
      {children}
    </main>
  );
}
