"use client";
import { Alert, Button, Col, Divider, Form, Input, Modal, Rate, Result, Row } from "antd";
import React, { useState } from "react";
import { TNewReviewForm, VALIDATION_RULES } from "./constants";
import { useAuth } from "@/hooks/useAuth.hook";
import { createNewReview } from "./actions";
import Link from "next/link";

const reactListRating = ["Lừa đảo", "GD thất bại", "Cần chú ý", "Bình thường", "Rất tốt"];

export default function CreateTransactionReviewPage() {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [createReviewId, setCreateReviewId] = useState<string | undefined>(undefined);
  const { user } = useAuth();

  const handleSubmitted = async (value: TNewReviewForm) => {
    value.userCreated = user?.user_id;
    value.nameUserComment = user?.name;
    setLoading(true);
    try {
      const res = await createNewReview(value);
      if (res.success) {
        setCreateReviewId(res.data?._id);
        setOpenModal(true);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto min-h-screen pt-20">
      <div className="mb-3 rounded-md bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary lg:text-3xl">SRP Project</h1>
          <p className="text-base font-medium lg:text-xl">Tạo mới một bài đánh giá giao dịch của bạn</p>
        </div>
        <Alert
          className="mb-6 mt-3"
          type="info"
          banner
          message={
            <p>
              Các trường có ký tự <span className="text-red-400">*</span> là bắt buộc, vui lòng điền đầy đủ thông tin!
            </p>
          }
        />
        <Form onFinish={handleSubmitted} layout="vertical" className="p-4">
          <h1 className="text-xl font-bold text-primary">Thông tin giao dịch của bạn:</h1>
          <Divider className="my-2" />
          <Row gutter={[16, 16]} className="mt-3">
            <Col xs={24} xl={7}>
              <Form.Item rules={VALIDATION_RULES.fullName} name="fullName" label="Tên người mà bạn giao dịch:">
                <Input size="large" placeholder="Tên, biệt danh mà bạn biết,..." />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12} xl={6}>
              <Form.Item rules={VALIDATION_RULES.bankName} name="bank_name" label="Tên ngân hàng:">
                <Input size="large" placeholder="MB Bank, TP Bank, ..." />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12} xl={6}>
              <Form.Item rules={VALIDATION_RULES.bankAccount} name="bank_account" label="Số tài khoản:">
                <Input size="large" placeholder="Nhập số tài khoản liên quan" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12} xl={5}>
              <Form.Item name="phoneNumber" label="Số điện thoại:">
                <Input size="large" placeholder="Nhập nếu bạn nắm rõ thông tin này" />
              </Form.Item>
            </Col>
          </Row>
          <h1 className="text-xl font-bold text-primary">Đánh giá của bạn về giao dịch này:</h1>
          <Divider className="my-2" />
          <div className="mt-8 flex flex-col items-center justify-center">
            <Form.Item name="rating">
              <Rate
                onChange={setRating}
                style={{ fontSize: 40 }}
                value={rating}
                tooltips={reactListRating}
                className="mx-auto mt-4 block"
              />
            </Form.Item>
          </div>
          {rating > 0 && (
            <div className="mt-6">
              <h1 className="text-xl font-bold text-primary">
                Đánh giá: {rating}/5 - {reactListRating[rating - 1]}:
              </h1>
              <Divider className="my-2" />
              <Form.Item
                rules={VALIDATION_RULES.comment}
                name="comment"
                label="Để lại một vài ý kiến của bạn về giao dịch này:"
              >
                <Input.TextArea rows={6} placeholder="Nhận xét của bạn về giao dịch này" />
              </Form.Item>
              <div className="flex justify-end">
                <Button disabled={loading} loading={loading} size="large" htmlType="submit" type="primary">
                  Gửi đánh giá
                </Button>
              </div>
            </div>
          )}
        </Form>
      </div>
      <Modal
        centered
        title="Gửi đánh giá thành công"
        open={openModal}
        footer={null}
        onCancel={() => setOpenModal(false)}
      >
        <Result
          status="success"
          title="Cảm ơn bạn đã gửi đánh giá!"
          subTitle="Đánh giá của bạn sẽ giúp ích cho những người khác trong quá trình giao dịch!"
          extra={[
            <Link href={`/transaction-review/${createReviewId}`} key="console">
              <Button type="primary">Xem báo cáo vừa tạo</Button>
            </Link>,
          ]}
        />
      </Modal>
    </div>
  );
}
