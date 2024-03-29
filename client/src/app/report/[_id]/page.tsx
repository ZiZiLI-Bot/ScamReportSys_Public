import AlertIcon from "@/assets/images/SCAM_AlERT.png";
import { CPImageList } from "@/components/CPImageList";
import { CPListData, type TCPListData } from "@/components/CPListData/CPListData";
import { TReport } from "@/lib/Types";
import { SV_HttpGet, TRes } from "@/utils/Http";
import { Watermark } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommentsRP from "./(CommentRP)/CommentsRP";

const generateTableDataReport = (report: TReport | undefined): TCPListData[] => {
  const items: TCPListData[] = [
    {
      key: 1,
      title: "Loại báo cáo:",
      content: report?.reportType,
    },
    {
      key: 2,
      title: "Scammer:",
      content: report?.scammer_name,
    },
    {
      key: 3,
      title: "Giới tính:",
      content: report?.scammer_gender === "female" ? "Nữ" : "Nam",
    },
    {
      key: 4,
      title: "Ngân hàng:",
      content: report?.scammer_bankName,
    },
    {
      key: 5,
      title: "Số tài khoản:",
      content: report?.scammer_bankAccount,
    },
    {
      key: 6,
      title: "Số điện thoại:",
      content: report?.scammer_phone,
    },
    {
      key: 7,
      title: "Email:",
      content: report?.scammer_email,
    },
    // {
    //   key: 8,
    //   title: "Địa chỉ:",
    //   content: report?.scammer.address,
    // },
    {
      key: 9,
      title: "Tài khoản liên quan:",
      content: report?.scammer_socialNetwork.map((social) => (
        <Link className="block text-sm text-blue-400 underline" key={social} href={social} target="_blank">
          {social}
        </Link>
      )),
    },
  ];

  return items;
};

export default async function ReportDescriptionPage({ params }: { params: { _id: string } }) {
  const url = `/reports/${params._id}`;
  const data = await SV_HttpGet<TRes<TReport>>(url, undefined, ["reports", params._id]);

  if (!data.data) {
    notFound();
  }

  return (
    <div className="container mx-auto p-2 lg:p-0">
      <div>
        <div className="my-2 flex flex-col items-center justify-center">
          <Image src={AlertIcon} alt="ALERT ICON" className="w-36" />
          <p className="text-xl font-bold text-red-500">SRP PROJECT!</p>
        </div>
        <p className="text-base font-bold">Loại báo cáo: {data.data?.reportType}</p>
        <p className="block font-medium">
          Báo cáo lừa đảo:{" "}
          <span className="font-normal">
            {data.data?.scammer_name} - {data.data?.scammer_bankName} - {data.data?.scammer_bankAccount}
          </span>
        </p>
        <div className="mt-1 flex justify-end">
          <p className="text-sm text-blue-500/75">
            Cập nhật: {dayjs(data.data?.updatedAt).format("HH:mm DD/MM/YYYY")} - Duyệt bởi: ADMIN
          </p>
        </div>
      </div>
      <div className="mt-4">
        <CPListData title="Chi tiết báo cáo:" data={generateTableDataReport(data.data)} />
      </div>
      <div className="mt-4">
        <ReportContent content={data.data?.description} images={data.data?.evidencePhoto} />
      </div>
      <div className="my-4">
        <CommentsRP reportId={params._id} />
      </div>
    </div>
  );
}

type ReportContentProps = {
  content: string | undefined;
  images: string[] | undefined;
};

const ReportContent = ({ content, images }: ReportContentProps) => {
  return (
    <div className="rounded-md border-2">
      <div className="border-b bg-slate-50 px-4 py-2">
        <p className="text-xl font-bold text-primary">Nội dung báo cáo:</p>
      </div>
      <div className="p-4">
        <Watermark content="SCAM!" gap={[30, 50]} font={{ color: "rgba(225,0,0,0.15)" }}>
          <div className="min-h-60">
            <p className="block text-base">{content}</p>
          </div>
        </Watermark>
        <p className="text-xl font-bold text-primary">Hình ảnh bằng chứng:</p>
        <CPImageList images={images} />
      </div>
    </div>
  );
};
