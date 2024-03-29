import { CPListData, TCPListData } from "@/components/CPListData";
import { TTSReview } from "@/lib/Types/TSReview.types";
import { SV_HttpGet, TRes } from "@/utils/Http";
import { StarFilled } from "@ant-design/icons";
import { Rate } from "antd";
import TSRating from "./(TSRating)/TSRating";

const GenDataTSReview = (TSReview: TTSReview | undefined): TCPListData[] => {
  const items: TCPListData[] = [
    { key: 1, title: "Tên người giao dịch", content: TSReview?.fullName },
    { key: 2, title: "Ngân hàng", content: TSReview?.bank_name },
    { key: 3, title: "STK", content: TSReview?.bank_account },
    {
      key: 4,
      title: "Số điện thoại",
      content: TSReview?.phoneNumber?.slice(0, 4) + "****" + TSReview?.phoneNumber?.slice(-3),
    },
  ];
  return items;
};

export default async function DetailTSReviewPage({ params }: { params: { _id: string } }) {
  const { data: TSReview } = await SV_HttpGet<TRes<TTSReview>>(`/ts_review/${params._id}`, undefined, [
    "ts_reviews",
    params._id,
  ]);

  return (
    <div className="mt-20">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold lg:text-4xl">SRP Project</h1>
        <p className="text-base font-medium lg:text-xl">Chi tiết các đánh giá từ người dùng</p>
        <div className="mt-4">
          <CPListData title="Thông tin người nhận giao dịch:" data={GenDataTSReview(TSReview)} />
        </div>
        <div className="mt-6">
          <h1 className="text-center text-xl font-medium lg:text-left lg:text-2xl">Đánh giá trung bình:</h1>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-3 text-5xl font-bold">
              <p>
                {TSReview?.AV_rating.toFixed(1)}
                <span className="text-xl font-normal lg:text-2xl">/5</span>
              </p>
              <StarFilled style={{ fontSize: 50, color: "#fadb14" }} />
            </div>
            <Rate
              style={{ fontSize: 45, marginTop: 10 }}
              disabled
              defaultValue={Number(TSReview?.AV_rating.toFixed(1))}
            />
            <p className="text-xl text-primary">Từ đánh giá của {TSReview?.count_rating} người dùng</p>
          </div>
        </div>
      </div>
      <TSRating TSReviewId={params._id} />
    </div>
  );
}
