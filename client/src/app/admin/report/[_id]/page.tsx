/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { CPImageList } from "@/components/CPImageList";
import { CPListData, TCPListData } from "@/components/CPListData";
import { TReport } from "@/lib/Types";
import { TRes } from "@/utils/Http";
import { CL_Http } from "@/utils/Http/Http.client";
import { Select, Watermark, notification } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { MdInfoOutline } from "react-icons/md";
import useSWR, { mutate } from "swr";
import { HIDDEN_OPTIONS, STATUS_OPTIONS } from "./constants";
import { updateStatus } from "./actions";

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

const generateUserCreate = (report: TReport | undefined): TCPListData[] => {
  const items: TCPListData[] = [
    {
      key: 1,
      title: "Người báo cáo:",
      content: `${report?.userCreated.firstName} ${report?.userCreated.lastName}`,
    },
    {
      key: 2,
      title: "ID người báo cáo:",
      content: report?.userCreated._id,
    },
    {
      key: 3,
      title: "Thời gian tạo:",
      content: dayjs(report?.createdAt).format("HH:mm DD/MM/YYYY"),
    },
  ];
  return items;
};

const fetcher = (url: string) => CL_Http.get(url).then((res) => res.data);

export default function AdminReportDetail({ params }: { params: { _id: string } }) {
  const url = `/reports/${params._id}`;
  const [notificationApi, contextHolder] = notification.useNotification();
  const { data, isLoading, error } = useSWR<TRes<TReport>>(url, fetcher);
  const report = data?.data;

  const handleUpdateStatus = async (value: string | boolean, type: "status" | "hidden") => {
    try {
      const update = await updateStatus(value, type, params._id);
      notificationApi.success({
        message: update.message,
        description: update.description,
      });
      mutate(url);
    } catch (error: any) {
      notificationApi.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-2 lg:p-0">
      {contextHolder}
      {error && notificationApi.error(error.message)}
      <div className="mb-6 w-full rounded-lg bg-secondary p-4 shadow-md">
        <div className="flex items-center space-x-1">
          <MdInfoOutline className="text-blue-800" size={22} />
          <h1 className="text-base font-bold">Trạng thái bài đăng:</h1>
        </div>
        <div className="mx-6 mt-4 flex space-x-3">
          <div>
            <p className="text-base font-medium">Trạng thái:</p>
            <Select
              className="w-40"
              options={STATUS_OPTIONS}
              value={report?.status}
              onChange={(value) => {
                handleUpdateStatus(value, "status");
              }}
            />
          </div>
          <div>
            <p className="text-base font-medium">Hiển thị:</p>
            <Select
              className="w-40"
              options={HIDDEN_OPTIONS}
              value={report?.hidden}
              onChange={(value) => {
                handleUpdateStatus(value, "hidden");
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="text-base font-bold">Loại báo cáo: {report?.reportType}</p>
        <p className="block font-medium">
          Báo cáo lừa đảo:{" "}
          <span className="font-normal">
            {report?.scammer_name} - {report?.scammer_bankName} - {report?.scammer_bankAccount}
          </span>
        </p>
        <div className="mt-1 flex justify-end">
          <p className="text-sm text-blue-500/75">
            Cập nhật cuối: {dayjs(report?.updatedAt).format("HH:mm DD/MM/YYYY")}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <CPListData loading={isLoading} title="Chi tiết báo cáo:" data={generateTableDataReport(report)} />
      </div>
      <div className="mt-4">
        <CPListData loading={isLoading} title="Người tạo báo cáo:" data={generateUserCreate(report)} />
      </div>
      <div className="mt-4">
        <ReportContent content={report?.description} images={report?.evidencePhoto} />
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
