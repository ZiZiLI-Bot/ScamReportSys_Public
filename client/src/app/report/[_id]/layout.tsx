import { Header } from "@/components/Header";
import { TReport } from "@/lib/Types";
import { SV_HttpGet, TRes, buildUrl } from "@/utils/Http";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { _id: string } }): Promise<Metadata> {
  const report = await SV_HttpGet<TRes<TReport>>(`/reports/${params._id}`, undefined, ["report", params._id]);

  return {
    title: `Báo cáo lừa đảo: ${report.data?.scammer_name} - ${report.data?.scammer_bankName} - ${report.data?.scammer_bankAccount}`,
    description: `Thông tin bài báo cáo ${report.data?.reportType} liên quan đến: ${report.data?.scammer_name} - ${report.data?.scammer_bankName} - ${report.data?.scammer_bankAccount}`,
  };
}

export default function ReportDescriptionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { _id: string };
}) {
  fetch(buildUrl(`/analytics-reports/view_report/${params._id}`), { method: "POST" });
  return (
    <main>
      <Header style={{ position: "fixed" }} />
      <div className="mt-20">{children}</div>
    </main>
  );
}
