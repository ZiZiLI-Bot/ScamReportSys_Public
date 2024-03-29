"use client";
import { CPTable } from "@/components/CPTable";
import { TReport } from "@/lib/Types";
import { TRes } from "@/utils/Http";
import { CL_Http } from "@/utils/Http/Http.client";
import { Button, Tag, message } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";
import qs from "qs";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { StatusTag, TIME_FORMAT } from "../constants";
import { hiddenReports } from "./actions";
import Link from "next/link";

let initParams = {
  limit: 10,
  page: 1,
  sort: "desc",
};

const fetcher = (url: string) => CL_Http.get(url).then((res) => res.data);

export default function ReportManager() {
  const [params, setParams] = useState(initParams);
  const url = `/reports?${qs.stringify(params)}`;
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading, error } = useSWR<TRes<TReport[]>>(url, fetcher);

  const handleHiddenReport = async (_id: string, type: string) => {
    try {
      await hiddenReports(_id, type);
      mutate(url);
      messageApi.success(`Đã ${type === "hidden" ? "ẩn" : "hiện thị"} bài đăng`);
    } catch (error) {
      messageApi.error("Lỗi hệ thống");
    }
  };

  const handleChangePage: TableProps["onChange"] = (pagination) => {
    setParams({
      ...params,
      page: pagination.current || 1,
    });
  };

  const COLUMNS: ColumnsType<any> = [
    {
      title: "id",
      dataIndex: "_id",
      width: "5%",
      render: (_id: string) => (
        <span>
          {_id.slice(0, 3)}...{_id.slice(-4)}
        </span>
      ),
    },
    {
      title: "Người báo cáo",
      dataIndex: "userName",
      width: "10%",
      render: (_, record) => (
        <span>
          {record.userCreated.firstName} {record.userCreated.lastName}
        </span>
      ),
    },
    { title: "Loại báo cáo", dataIndex: "reportType", width: "10%" },
    { title: "Scammer", dataIndex: "scammer_name", width: "10%" },
    {
      title: "Bank",
      dataIndex: "bank",
      width: "10%",
      render: (_, record) => (
        <span>
          {record.scammer_bankName} - {record.scammer_bankAccount}
        </span>
      ),
    },
    { title: "Trạng thái", dataIndex: "status", width: "5%", render: (status) => <StatusTag status={status} /> },
    {
      title: "Hiển thị",
      dataIndex: "hidden",
      width: "5%",
      render: (hidden) => (hidden ? <Tag color="default">Ẩn</Tag> : <Tag color="cyan">Hiển thị</Tag>),
    },
    {
      title: "Tạo lúc",
      dataIndex: "createdAt",
      width: "10%",
      render: (createdAt) => <span>{dayjs(createdAt).format(TIME_FORMAT)}</span>,
    },
    {
      title: "Action",
      dataIndex: "Action",
      width: "10%",
      render: (_, record) => (
        <div className="flex space-x-1">
          <Button
            size="small"
            type="primary"
            className="w-[70px]"
            onClick={() => handleHiddenReport(record._id, record.hidden ? "visible" : "hidden")}
          >
            {record.hidden ? "Hiện thị" : "Ẩn bài"}
          </Button>
          <Link href={`./report/${record._id}`}>
            <Button size="small" type="link">
              Chi tiết
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <h1 className="mb-2 text-2xl font-medium">Danh sách bài đăng đang có trên hệ thống:</h1>
      <p className="mb-2">Hiện đang có {data?.pagination?.total} bài đăng</p>
      {error && <p>Đã có lỗi xảy ra</p>}
      <CPTable
        pagination={{
          pageSize: params.limit,
          total: data?.pagination?.total,
        }}
        onChange={handleChangePage}
        loading={isLoading}
        data={data?.data}
        columns={COLUMNS}
      />
    </div>
  );
}
