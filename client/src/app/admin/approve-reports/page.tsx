"use client";
import { CPTable } from "@/components/CPTable";
import { TReport } from "@/lib/Types";
import { TRes } from "@/utils/Http";
import { CL_Http } from "@/utils/Http/Http.client";
import { Button, message } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";
import qs from "qs";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { StatusTag, TIME_FORMAT } from "../constants";
import { approveReports } from "./actions";
import Link from "next/link";

const fetcher = (url: string) => CL_Http.get(url).then((res) => res.data);

const initParams = {
  limit: 10,
  page: 1,
  sort: "desc",
  status: "pending",
};

export default function ApproveReports() {
  const [params, setParams] = useState(initParams);
  const [messageApi, contextHolder] = message.useMessage();
  const url = `/reports?${qs.stringify(params)}`;
  const { data, isValidating, error } = useSWR<TRes<TReport[]>>(url, fetcher);
  const reports = data?.data;

  const handleApprove = async (id: string, type: string) => {
    try {
      const approve = await approveReports(id, type);
      if (approve.success) {
        messageApi.success("Đã duyệt bài đăng");
        mutate(url);
      }
      return;
    } catch (error: any) {
      messageApi.error(error.message);
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
          <Button size="small" type="primary" onClick={() => handleApprove(record._id, "approved")}>
            Duyệt
          </Button>
          <Button danger size="small" type="primary" onClick={() => handleApprove(record._id, "rejected")}>
            Từ chối
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
      <h1 className="text-2xl font-medium">Danh sách bài đăng đang chờ duyệt</h1>
      <p className="my-2">Hiện đang có {data?.pagination?.total} đang chờ duyệt:</p>
      {error && <p>Đã có lỗi xảy ra</p>}
      <CPTable
        pagination={{
          pageSize: params.limit,
          total: data?.pagination?.total,
        }}
        onChange={handleChangePage}
        loading={isValidating}
        data={reports}
        columns={COLUMNS}
      />
    </div>
  );
}
