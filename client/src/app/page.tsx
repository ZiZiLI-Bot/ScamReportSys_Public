import Scam_alert from "@/assets/images/SCAM_AlERT.png";
import Binary_BG from "@/assets/images/binary_BG.jpg";
import shield_Icon from "@/assets/images/shield.svg";
import { CPSearchInput } from "@/components/CPSearchInput";
import CPTitle from "@/components/CPTitle/CPTitle";
import { Header } from "@/components/Header";
import { TGAReport } from "@/lib/Types/GAReport.types";
import { GA_TSReview } from "@/lib/Types/GATSReview.types";
import { TParamAPI, TRes, buildUrl } from "@/utils/Http";
import { Button, Card, Col, Rate, Row, Watermark } from "antd";
import { StarFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const params: TParamAPI = { page: "1", limit: "6", sort: "desc", sortBy: "views_day" };

const getReports = async () => {
  const data: TRes<TGAReport[]> = await fetch(buildUrl("/analytics-reports", params), {
    next: { revalidate: 60, tags: ["reports"] },
  }).then((res) => res.json());
  return data;
};

const getTransactions_reviews = async () => {
  const data: TRes<GA_TSReview[]> = await fetch(buildUrl("/analytics-tsreview", params), {
    next: { revalidate: 60, tags: ["ts_reviews"] },
  }).then((res) => res.json());
  return data;
};

export default async function Home() {
  const [reports, TS_reviews] = await Promise.all([getReports(), getTransactions_reviews()]);
  return (
    <main className="relative">
      <Header style={{ position: "fixed" }} isChangeColor={true} />
      <div className="h-screen w-full">
        <div
          className="h-3/4 w-full bg-auto bg-left text-white lg:bg-top"
          style={{ backgroundImage: `url(${Binary_BG.src})` }}
        >
          <div className="container mx-auto h-full px-4 py-8">
            <Row className="h-full w-full lg:flex-row-reverse">
              <Col xs={24} lg={12} className="flex flex-col items-center justify-center lg:justify-center">
                <Image src={shield_Icon} alt="shield" className="w-2/5 lg:w-1/2" />
              </Col>
              <Col xs={24} lg={12} className="flex flex-col justify-center lg:justify-center">
                <h2 className="text-xl font-bold">SRP Project</h2>
                <p className="text-2xl font-medium lg:text-3xl">Hệ thống báo cáo lừa đảo trực tuyến</p>
                <CPSearchInput />
                <Link href="/report/new-report">
                  <Button type="primary" className="mt-2 w-fit" size="large">
                    Gửi báo cáo lừa đảo
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
        <div className="container mx-auto p-2 pt-8">
          <div className="flex justify-center">
            <CPTitle>Giới thiệu về dự án</CPTitle>
          </div>
          <Row gutter={[16, 16]} className="flex-row-reverse">
            <Col xs={24} lg={12} className="flex items-center justify-center">
              <Image src={Scam_alert} alt="Scammer Alert" className="mt-4 w-1/3" />
            </Col>
            <Col xs={24} lg={12} className="flex items-center px-4 lg:text-base">
              <p>
                Ngày này, khi Internet cùng các thiết bị điện tử ngày càng phát triển, việc mua bán trao đỗi trở lên
                ngày càng đơn giản và dễ dàng. Tuy nhiên, điều này cũng tạo điều kiện thuận lợi cho các đối tượng lừa
                đảo. Để giúp người dùng có thể nhận biết và phòng tránh những đối tượng lừa đảo, chúng tôi đã xây dựng
                hệ thống báo cáo lừa đảo trực tuyến. <Link href="/gioi-thieu">Chi tiết giới thiệu dự án...</Link>
              </p>
            </Col>
          </Row>
        </div>
        <div className="mt-10 bg-slate-100/40">
          <div className="container mx-auto py-4">
            <div className="flex justify-center">
              <CPTitle description={`Các báo cáo được xem nhiều nhất ngày ${dayjs().format("DD/MM")}`}>
                Báo cáo xem nhiều nhất hôm nay
              </CPTitle>
            </div>
            <div className="m-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reports.data?.map((doc) => (
                <Watermark
                  font={{ color: "rgba(255, 0, 0, 0.18)" }}
                  width={90}
                  gap={[20, 20]}
                  content="REPORT!"
                  className="w-full"
                  key={doc._id}
                >
                  <Card
                    title={doc.report.reportType}
                    extra={
                      <Link rel="next" href={`/report/${doc.report._id}`}>
                        Chi tiết
                      </Link>
                    }
                  >
                    <p className="font-medium">Scammer: {doc.report.scammer_name}</p>
                    <p>Ngân hàng: {doc.report.scammer_bankName}</p>
                    <p>STK: {doc.report.scammer_bankAccount}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-700">
                        Cập nhật: {dayjs(doc.report.createdAt).format("hh:mm DD/MM/YYYY")}
                      </p>
                      <p className="text-sm text-red-600">{doc.views_day} lượt xem trong ngày</p>
                    </div>
                  </Card>
                </Watermark>
              ))}
            </div>
            <div className="flex justify-end">
              <Link href="/report">
                <Button type="link">Xem tất cả</Button>
              </Link>
            </div>
          </div>
          <div className="mt-6 w-full bg-white">
            <div className="container mx-auto py-4">
              <div className="flex w-full justify-center">
                <CPTitle description={`Các bài đánh giá giao dịch được xem nhiều nhất ngày ${dayjs().format("DD/MM")}`}>
                  Bài đánh giá được xem nhiều nhất hôm nay
                </CPTitle>
              </div>
              <div className="m-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {TS_reviews.data?.map((doc) => (
                  <Watermark
                    font={{ color: "rgba(3, 177, 80, 0.18)" }}
                    width={90}
                    gap={[20, 20]}
                    content="REVIEW!"
                    className="w-full"
                    key={doc._id}
                  >
                    <Card
                      bordered={false}
                      className="shadow-lg"
                      title={`${doc.TSReview.fullName} - ${doc.TSReview.bank_account}`}
                      extra={
                        <Link rel="next" href={`/transaction-review/${doc.TSReview._id}`}>
                          Chi tiết
                        </Link>
                      }
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <p className="text-center text-sm font-medium lg:text-base">
                          Được đánh giá bởi {doc.TSReview.count_rating} người dùng với điểm trung bình
                        </p>
                        <div className="flex items-center space-x-1">
                          <p className="text-xl font-bold">
                            {doc.TSReview.AV_rating.toFixed(1)}
                            <span className="text-sm">/5</span>
                          </p>
                          <StarFilled style={{ fontSize: 20, color: "#fadb14" }} />
                        </div>
                        <Rate
                          style={{ fontSize: 23 }}
                          disabled
                          defaultValue={Number(doc.TSReview.AV_rating.toFixed(1))}
                        />
                      </div>
                      <div>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-sm font-medium text-blue-700">
                            Cập nhật: {dayjs(doc.TSReview.createdAt).format("hh:mm DD/MM/YYYY")}
                          </p>
                          <p className="text-sm text-red-600">{doc.views_day} lượt xem trong ngày</p>
                        </div>
                      </div>
                    </Card>
                  </Watermark>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
