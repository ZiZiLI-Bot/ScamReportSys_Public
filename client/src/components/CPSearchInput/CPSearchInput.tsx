"use client";
import { TReport } from "@/lib/Types";
import { TTSReview } from "@/lib/Types/TSReview.types";
import { TRes } from "@/utils/Http";
import { CL_Http } from "@/utils/Http/Http.client";
import { Button, Card, ConfigProvider, Divider, Input, Rate, Watermark, theme } from "antd";
import dayjs from "dayjs";
import _ from "lodash";
import Link from "next/link";
import qs from "qs";
import { useState } from "react";
import removeAccents from "remove-accents";

const { Search } = Input;

const reportParams = { page: "1", limit: "6", sort: "desc", status: "approved", hidden: "false" };
const tsReviewParams = { page: "1", limit: "6", sort: "desc" };

const TIME_FORMAT = "DD/MM/YYYY HH:mm";

const getSearchReport = async (value: string) => {
  const url = `/reports/search/${removeAccents(value).toLowerCase()}?${qs.stringify(reportParams)}`;
  const { data: res } = await CL_Http.get<TRes<TReport[]>>(url);
  return res;
};

const getSearchTSReview = async (value: string) => {
  const url = `/ts_review/search/${removeAccents(value).toLowerCase()}?${qs.stringify(tsReviewParams)}`;
  const { data: res } = await CL_Http.get<TRes<TTSReview[]>>(url);
  return res;
};

export function CPSearchInput() {
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState<TRes<TReport[]>>({});
  const [tsReviews, setTSReviews] = useState<TRes<TTSReview[]>>({});

  const handleSearch = _.debounce(async (value: string) => {
    if (value === "") return setOpen(false);
    const [report, tsReview] = await Promise.all([getSearchReport(value), getSearchTSReview(value)]);
    setReports(report);
    setTSReviews(tsReview);
    setOpen(true);
  }, 400);

  return (
    <div className="relative my-2">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Search
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          placeholder="Tìm kiếm các Báo cáo, Tên, Số điện thoại, ..."
          size="large"
        />
      </ConfigProvider>
      {open && (
        <div className="absolute z-10 mt-2 flex max-h-[500px] w-full flex-col space-y-2 overflow-auto rounded-md border-2 bg-gray-100 p-2 text-black shadow-2xl">
          {(reports.data?.length || 0) > 0 && (
            <>
              <p className="mb-2 ml-2 border-b text-base font-medium text-red-500">Có {} báo cáo liên quan:</p>
              {reports.data?.map((report) => (
                <Watermark content="SCAM" gap={[40, 40]} key={report._id}>
                  <Card
                    extra={
                      <Link href={`/report/${report._id}`}>
                        <Button type="link">Chi tiết</Button>
                      </Link>
                    }
                    className="shadow-lg"
                    size="small"
                    title={report.reportType}
                  >
                    <p>Scammer: {report.scammer_name}</p>
                    <p>
                      {report.scammer_bankName} - {report.scammer_bankAccount}
                    </p>
                    <div className="flex justify-end">
                      <p className="text-sm text-blue-500">Cập nhật: {dayjs(report.updatedAt).format(TIME_FORMAT)}</p>
                    </div>
                  </Card>
                </Watermark>
              ))}
              <div className="mr-2 flex justify-end">
                <Link href="/">Xem đầy đủ các báo cáo còn lại</Link>
              </div>
            </>
          )}
          <div>
            {(tsReviews.data?.length || 0) > 0 && (
              <>
                <p className="mb-2 ml-2 border-b text-base font-medium text-green-500">Các bài đánh giá liên quan:</p>
                {tsReviews.data?.map((tsReview) => (
                  <Watermark content="REVIEW" gap={[40, 40]} key={tsReview._id}>
                    <Card
                      extra={
                        <Link href={`/transaction-review/${tsReview._id}`}>
                          <Button type="link">Chi tiết</Button>
                        </Link>
                      }
                      className="shadow-lg"
                      size="small"
                      title={`${tsReview.fullName} - ${tsReview.bank_account}`}
                    >
                      <div className="flex flex-col items-center justify-center space-y-1">
                        <p className="text-xl font-bold">{tsReview.AV_rating.toFixed(1)}/5</p>
                        <Rate disabled defaultValue={tsReview.AV_rating} />
                        <p>Với {tsReview.count_rating} lượt đánh giá từ người dùng</p>
                      </div>
                      <div className="flex justify-end">
                        <p className="text-sm text-blue-500">
                          Cập nhật: {dayjs(tsReview.updatedAt).format(TIME_FORMAT)}
                        </p>
                      </div>
                    </Card>
                  </Watermark>
                ))}
                <div className="mr-2 mt-2 flex justify-end">
                  <Link href="/">Xem đầy đủ các bài đánh giá còn lại</Link>
                </div>
              </>
            )}
            <Divider className="my-4" />
            <div className="my-2 flex flex-col items-center space-y-2">
              <p className="text-center text-base font-medium text-primary">
                Không có thông tin giao dịch bạn cần tìm? Tạo mới một bản đánh giá
              </p>
              <Link href="/transaction-review/new-review">
                <Button type="primary">Tạo mới bài đánh giá</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
