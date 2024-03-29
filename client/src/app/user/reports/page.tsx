/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useAuth } from "@/hooks/useAuth.hook";
import { TReport } from "@/lib/Types";
import { Card, Col, Divider, Empty, Pagination, Row, Select, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { getReport } from "./actions";
import dayjs from "dayjs";

const LIMIT_PAGE = 10;

const optionsStatus = [
  { value: "all", label: <p>Tất cả</p> },
  { value: "approved", label: <p className="text-green-600">Đã duyệt</p> },
  { value: "pending", label: <p className="text-yellow-600">Chờ duyệt</p> },
  { value: "rejected", label: <p className="text-red-600">Từ chối</p> },
];

const optionsSort = [
  { value: "desc", label: "Mới nhất" },
  { value: "asc", label: "Cũ nhất" },
];

export default function UserReportPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TReport[]>([]);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("desc");
  const [status, setStatus] = useState("all");

  const fetchData = async () => {
    if (user?.user_id) {
      const params = {
        page: String(page),
        limit: String(LIMIT_PAGE),
        sort,
        userCreated: user?.user_id,
        status: status === "all" ? undefined : status,
      };
      setLoading(true);
      const reports = await getReport(params);
      if (reports.success) {
        setData(reports.data || []);
        setTotal(reports.pagination?.total || 0);
      } else {
        message.error(reports.message?.[0] ?? "Có lỗi xảy ra, vui lòng thử lại sau!");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, user, sort, status]);

  return (
    <div className="container mx-auto p-2 pt-16">
      <h1 className="text-2xl font-bold text-primary">Quản lý bài đăng</h1>
      <p className="text-md text-gray-500">Các bài đăng của bạn đã tồn tại trên hệ thống</p>
      <Row gutter={[16, 16]} className="p-2">
        <Col xs={24} className="mt-2 w-full rounded-md bg-white p-3 shadow-md">
          <h3 className="mb-2 text-base font-medium">Lọc theo:</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>Trạng thái:</span>
              <Select value={status} options={optionsStatus} onChange={setStatus} />
            </div>
            <div className="flex items-center space-x-2">
              <span>Sắp xếp:</span>
              <Select value={sort} options={optionsSort} onChange={setSort} />
            </div>
          </div>
        </Col>
        <Col xs={24} className="p-0">
          {loading ? (
            [1, 2, 3, 4, 5].map((i) => <Card key={i} loading={loading} className="mb-2" />)
          ) : data?.length > 0 ? (
            <div>
              <Divider orientation="left">Tổng {total} báo cáo</Divider>
              {data.map((report) => (
                <Card
                  key={report._id}
                  title={report.reportType}
                  extra={<StatusTag status={report?.status} />}
                  className="mb-2 shadow-md"
                >
                  <p>Trạng thái: {report.hidden ? "Ẩn" : "Hiển thị"}</p>
                  <p>{report.scammer_name}</p>
                  <p>
                    {report.scammer_bankName} - {report.scammer_bankAccount}
                  </p>
                  <p className="text-sm text-blue-400">
                    Cập nhật: {dayjs(report.updatedAt).format("HH:mm DD/MM/YYYY")}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <Empty description="Chưa có bản ghi nào!" />
          )}
        </Col>
      </Row>
      <div className="flex w-full items-center justify-center">
        <Pagination pageSize={LIMIT_PAGE} current={page} total={total} onChange={(page) => setPage(page)} />
      </div>
    </div>
  );
}

const StatusTag = ({ status }: { status: string | undefined }) => {
  switch (status) {
    case "approved":
      return <Tag color="green">Đã duyệt</Tag>;
    case "pending":
      return <Tag color="yellow">Chờ duyệt</Tag>;
    case "rejected":
      return <Tag color="red">Từ chối</Tag>;
    default:
      return <Tag color="blue">Không xác định</Tag>;
  }
};
