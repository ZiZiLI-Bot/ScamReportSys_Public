"use client";
import {
  Alert,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Result,
  Row,
  Select,
  Upload,
  UploadProps,
  message,
} from "antd";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { FaImages } from "react-icons/fa";
import { TReportForm, VALIDATION_RULES, genderOptions } from "./constants";
import { useAuth } from "@/hooks/useAuth.hook";
import { createReport } from "./actions";
import Link from "next/link";

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Dragger } = Upload;

export default function NewReport() {
  const [messageApi, contextHolder] = message.useMessage();
  const [imageList, setImageList] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: process.env.NEXT_PUBLIC_BASE_URL + "/stream/upload",
    headers: {
      Authorization: "Bearer " + getCookie("token"),
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        messageApi.success(`${info.file.name} đã tải lên!.`);
        const listUrl = info.fileList.map((file) => file.response.data.url);
        setImageList(listUrl);
      } else if (status === "error") {
        messageApi.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove(file) {
      setImageList((prev) => prev.filter((url) => url !== file.response.data.url));
    },
  };

  const handleSubmit = async (values: TReportForm) => {
    values.evidencePhoto = imageList;
    values.userCreated = user?.user_id;
    try {
      setLoading(true);
      const res = await createReport(values);
      setLoading(false);
      if (res.success) {
        setIsModalOpen(true);
      }
    } catch (error) {
      messageApi.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  return (
    <div className="container mx-auto min-h-screen pt-20">
      {contextHolder}
      <div className="mb-3 rounded-md bg-white shadow-md">
        <div className="px-4 pt-6">
          <h1 className="text-2xl font-bold text-primary">Thêm báo cáo của bạn:</h1>
          <p className="text-md text-primary/80">Mọi đóng góp của bạn luôn được ghi nhận</p>
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
        <Form
          initialValues={{
            scammer_gender: "male",
          }}
          onFinish={handleSubmit}
          size="small"
          layout="vertical"
          className="px-4"
        >
          <p className="text-xl font-bold text-primary">Thông tin người lừa đảo:</p>
          <Divider className="my-2" />
          <Row gutter={[16, 16]} className="mt-3">
            <Col xs={16} xl={8}>
              <FormItem name="scammer_name" rules={VALIDATION_RULES.SCAMMER_NAME} label="Tên người lừa đảo:">
                <Input size="large" placeholder="Tên, biệt danh mà bạn biết,..." />
              </FormItem>
            </Col>
            <Col xs={8} xl={3}>
              <FormItem name="scammer_gender" label="Giới tính:">
                <Select size="large" options={genderOptions} />
              </FormItem>
            </Col>
            <Col xs={24} lg={12} xl={7}>
              <FormItem name="scammer_email" rules={VALIDATION_RULES.SCAMMER_EMAIL} label="Email:">
                <Input size="large" placeholder="Nhập nếu bạn nắm rõ thông tin này" />
              </FormItem>
            </Col>
            <Col xs={24} lg={12} xl={6}>
              <FormItem name="scammer_phone" rules={VALIDATION_RULES.SCAMMER_PHONE} label="Số điện thoại:">
                <Input size="large" placeholder="Nhập nếu bạn nắm rõ thông tin này" />
              </FormItem>
            </Col>
            <Col xs={10} xl={4}>
              <FormItem name="scammer_bankName" rules={VALIDATION_RULES.BANK_NAME} label="Tên ngân hàng:">
                <Input size="large" placeholder="MB Bank, TP Bank, ..." />
              </FormItem>
            </Col>
            <Col xs={14} xl={7}>
              <FormItem name="scammer_bankAccount" rules={VALIDATION_RULES.BANK_ACCOUNT} label="Số tài khoản:">
                <Input size="large" placeholder="Nhập số tài khoản liên quan" />
              </FormItem>
            </Col>
            <Col xs={24} xl={13}>
              <FormItem name="scammer_socialNetwork" label="Liên kết mạng xã hội liên quan:">
                <Select mode="tags" size="large" placeholder="Link Facebook, Telegram, ... Có thể nhập nhiều" />
              </FormItem>
            </Col>
          </Row>
          <p className="text-xl font-bold text-primary">Nội dung chi tiết vụ việc:</p>
          <Divider className="my-2" />
          <Row gutter={[16, 16]} className="mt-3">
            <Col span={24}>
              <FormItem name="reportType" rules={VALIDATION_RULES.REPORT_TYPE} label="Loại báo cáo:">
                <Input size="large" placeholder="Lừa đảo tiền, lừa đảo trên mạng, ..." />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem name="description" rules={VALIDATION_RULES.REPORT_DETAIL} label="Nội dung chi tiết:">
                <TextArea rows={8} placeholder="Nhập nội dung chi tiết vụ việc" />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label="Ảnh bằng chứng:">
                <Alert
                  type="warning"
                  message={
                    <div className="ml-1">
                      <p>
                        Ảnh bằng chứng rất quan trọng trong việc kiểm duyệt bài đăng của bạn, có thể là ảnh chụp màn
                        hình phần chat, ảnh chụp giao dịch, ...
                      </p>
                      <p>Người kiểm duyệt sẽ xem xét thông tin của bạn dựa trên ảnh bằng chứng này!</p>
                    </div>
                  }
                  showIcon
                  className="mb-4"
                />
                <Dragger listType="picture" {...props} accept="image/*">
                  <p className="flex justify-center">
                    <FaImages size={60} className="text-primary" />
                  </p>
                  <p className="ant-upload-text my-4">Kéo thả hoặc chọn hình ảnh từ đây</p>
                  <p className="ant-upload-hint my-4">
                    Chỉ hỗ trợ định dạng ảnh: .png, .jpg, .jpeg, .gif. Tối đa 15 ảnh!
                  </p>
                </Dragger>
              </FormItem>
            </Col>
            <Checkbox className="ml-4" onChange={(e) => setIsAgree(e.target.checked)}>
              Tôi đã kiểm tra kỹ và xác nhận các thông tin trên hoàn toàn đúng sự thật
            </Checkbox>
            <Row className="w-full p-6">
              <Col span={24} className="flex justify-end">
                <Button
                  loading={loading}
                  disabled={imageList.length <= 0 || !isAgree || loading}
                  htmlType="submit"
                  type="primary"
                  size="large"
                >
                  Gửi báo cáo
                </Button>
              </Col>
            </Row>
          </Row>
        </Form>
      </div>
      <Modal footer={null} open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
        <Result
          status="success"
          title="Bài đăng đã được đưa vào hàng chờ duyệt!"
          subTitle="Báo cáo của bạn sẽ được kiểm duyệt bởi quản trị viện trong thời gian sớm nhất. Bạn có thể kiểm tra trạng thái trong phần báo cáo của tôi!"
          extra={[
            <Link key="console" href="/user/reports">
              <Button type="primary">Báo cáo của tôi</Button>
            </Link>,
            <Link key="home" href="/">
              <Button>Trang chủ</Button>
            </Link>,
          ]}
        />
      </Modal>
    </div>
  );
}
