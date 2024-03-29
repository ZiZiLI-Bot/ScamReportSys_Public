import { Header } from "@/components/Header";
import { TTSReview } from "@/lib/Types/TSReview.types";
import { SV_HttpGet, TRes, buildUrl } from "@/utils/Http";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: { params: { _id: string } }): Promise<Metadata> {
  const TSReview = await SV_HttpGet<TRes<TTSReview>>(`/ts_review/${params._id}`, undefined, ["ts_reviews", params._id]);

  return {
    title: `${TSReview.data?.fullName}: Đánh giá trung bình ${TSReview.data?.AV_rating} sao từ ${TSReview.data?.count_rating} lượt đánh giá`,
    description: `Báo cáo từ những người đã từng giao dịch với ${TSReview.data?.fullName} liên quan đến: ${TSReview.data?.bank_name} - ${TSReview.data?.bank_account}`,
  };
}

export default function DetailTSReviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { _id: string };
}) {
  fetch(buildUrl(`/analytics-tsreview/${params._id}`), { method: "POST" });
  return (
    <main>
      <Header style={{ position: "fixed" }} />
      {children}
    </main>
  );
}
