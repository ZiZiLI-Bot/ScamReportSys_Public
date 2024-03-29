"use client";
import { useAuth } from "@/hooks/useAuth.hook";
import { TTSRating } from "@/lib/Types/TSRating.types";
import { StarFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Form, Input, Modal, Pagination, Rate, Skeleton, notification } from "antd";
import { useState } from "react";
import { createNewTSRating } from "../action";
import { CL_Http } from "@/utils/Http/Http.client";
import useSWR, { mutate } from "swr";
import { TParamAPI, TRes } from "@/utils/Http";
import qs from "qs";
import dayjs from "dayjs";

const reactListRating = ["Lừa đảo", "GD thất bại", "Cần chú ý", "Bình thường", "Rất tốt"];

const fetcher = (url: string) => CL_Http.get(url).then((res) => res.data);

const VALIDATE = [
  {
    required: true,
    message: "Vui lòng nhập tên hiển thị!",
  },
  {
    required: true,
    message: "Hãy để lại một bình luận nào đó!",
  },
];

export default function TSRating({ TSReviewId }: { TSReviewId: string }) {
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [notificationApi, contextHolder] = notification.useNotification();
  const { user, isAuthenticated } = useAuth();
  const [form] = Form.useForm();
  const params: TParamAPI = {
    limit: "6",
    page: page.toString(),
    sort: "desc",
    sortBy: "_id",
    TSReviewId,
  };
  const url = `/tsreview-rating?${qs.stringify(params)}`;
  const { data: Ratings, isLoading, error } = useSWR<TRes<TTSRating[]>>(url, fetcher);

  const handleChangeRate = (value: number) => {
    setRating(value);
    setIsModalOpen(true);
  };

  const handleClosedModal = () => {
    setRating(0);
    setIsModalOpen(false);
  };

  const handleSubmitted = async () => {
    await form.validateFields();
    const values = form.getFieldsValue() as TTSRating;
    values.TSReviewId = TSReviewId;
    values.rating = rating;
    try {
      await createNewTSRating(values);
      notificationApi.success({
        message: "Cảm ơn bạn đã đánh giá!",
        description: "Đánh giá của bạn đã được ghi nhận!",
      });
      form.resetFields();
      mutate(url);
      setIsModalOpen(false);
    } catch (err) {
      notificationApi.error({
        message: "Có lỗi xảy ra!",
        description: "Vui lòng thử lại sau!",
      });
    }
  };

  return (
    <div className="mt-10 p-4">
      {contextHolder}
      <div className="container mx-auto mt-2">
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-base font-medium lg:text-xl">
            Nếu bạn đã giao dịch với người có thông tin giống như trên, hãy để lại đánh giá của mình về giao dịch đó!
          </p>
          <Rate
            onChange={handleChangeRate}
            value={rating}
            tooltips={reactListRating}
            className="mx-auto mt-4 block"
            style={{ fontSize: 40 }}
          />
        </div>
        <Divider />
        <div>
          <h1 className="text-xl font-medium lg:text-2xl">Đánh giá từ người dùng</h1>
          <div className="mt-4 space-y-2">
            {isLoading &&
              [1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="rounded-md border p-4">
                  <div className="flex space-x-2">
                    <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                    <Skeleton active />
                  </div>
                </div>
              ))}
            {Ratings?.data?.map((rating: TTSRating) => (
              <div key={rating._id} className="rounded-md border p-4">
                <div className="flex items-center space-x-2">
                  <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                  <p className="text-base font-medium lg:text-xl">{rating.fullName}</p>
                  <Rate disabled value={rating.rating} />
                </div>
                <div className="mt-4">
                  <p className="text-base">{rating.comment}</p>
                </div>
                <div className="flex justify-end">
                  <p className="text-sm text-gray-500">{dayjs(rating.updatedAt).format("hh:mm DD/MM/YYYY")} </p>
                </div>
              </div>
            ))}
          </div>
          <div className="my-6 flex items-center justify-center">
            <Pagination
              onChange={setPage}
              defaultCurrent={page}
              total={Ratings?.pagination?.total}
              defaultPageSize={6}
            />
          </div>
        </div>
      </div>
      <Modal
        centered
        className="w-full lg:w-1/2"
        title="Hãy giúp những người khác bằng cách để lại bình luận của bạn!"
        open={isModalOpen}
        onOk={handleSubmitted}
        onCancel={handleClosedModal}
      >
        <Form
          initialValues={{
            fullName: isAuthenticated ? user?.name : "Anonymous",
          }}
          form={form}
          size="small"
          layout="vertical"
        >
          <div className="my-3 flex flex-col items-center">
            <p className="text-base font-medium lg:text-xl">Đánh giá của bạn:</p>
            <div className="flex space-x-1 text-base lg:text-xl">
              <p>{rating}</p>
              <StarFilled style={{ fontSize: 16, color: "#fadb14" }} />
              <p>{reactListRating[rating - 1]}</p>
            </div>
          </div>
          <Form.Item rules={[VALIDATE[0]]} label="Tên hiển thị:" name="fullName">
            <Input size="large" />
          </Form.Item>
          <Form.Item rules={[VALIDATE[1]]} label="Bình luận:" name="comment">
            <Input.TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
