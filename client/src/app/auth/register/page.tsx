/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import REGISTER_ICON from "@/assets/images/RegisterIIL.svg";
import { Button, Form, Input, notification } from "antd";
import { Rule } from "antd/es/form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";
import { MdLockOutline, MdOutlineArrowBack, MdOutlineMail } from "react-icons/md";
import { Register, RegisterFiled } from "./actions";

const { Item } = Form;
const { Password } = Input;

const backgroundStyle: CSSProperties = {
  background: "linear-gradient(56deg, rgba(161,140,209,1) 45%, rgba(251,194,235,1) 94%)",
};

export default function RegisterPage() {
  const [form] = Form.useForm();
  const router = useRouter();

  class VALIDATION_RULES {
    static NAME: Rule[] = [{ required: true, message: "Vui lòng nhập đầy đủ" }];
    static EMAIL: Rule[] = [
      { required: true, message: "Vui lòng nhập email" },
      { type: "email", message: "Email không hợp lệ" },
    ];
    static PASSWORD: Rule[] = [
      { required: true, message: "Vui lòng nhập mật khẩu" },
      { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
    ];
    static RE_PASSWORD: Rule[] = [
      { required: true, message: "Vui lòng nhập lại mật khẩu" },
      { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
      {
        validator: (rule, value, callback) => {
          if (value !== form.getFieldValue("password")) {
            callback("Mật khẩu không trùng khớp");
          } else {
            callback();
          }
        },
      },
    ];
  }

  const onFinish = async (values: RegisterFiled) => {
    try {
      const res = await Register(values);
      if (res.success) {
        notification.success({
          message: "Đăng ký thành công!",
          description: "Đăng nhập để truy cập trang web",
        });
        router.push("/auth/login");
      }
    } catch (err: any) {
      notification.error({
        message: "Lỗi!",
        description: err.message,
      });
    }
  };
  return (
    <div style={backgroundStyle} className="flex h-screen w-full items-center justify-center">
      <div className="mx-3 w-full overflow-hidden rounded-xl bg-white shadow-xl lg:w-3/5">
        <div className="flex items-center space-x-2 bg-secondary p-2">
          <MdOutlineArrowBack size={20} onClick={() => router.back()} className="cursor-pointer" />
          <p className="text-base font-medium">SRP Project</p>
        </div>
        <div className="flex h-full">
          <div className="hidden h-full w-2/5 items-center justify-center md:flex">
            <Image alt="Login icon" src={REGISTER_ICON} width={300} />
          </div>
          <div className="flex h-full w-full flex-col p-4 md:w-3/5">
            <h2 className="text-2xl font-bold">Đăng ký tài khoản</h2>
            <Form
              form={form}
              onFinish={onFinish}
              className="mt-3 h-3/4 md:mt-8"
              layout="vertical"
              requiredMark={false}
              size="small"
            >
              <div className="flex justify-center space-x-3">
                <Item name="firstName" label="Họ tên đệm:" rules={VALIDATION_RULES.NAME}>
                  <Input placeholder="Nguyễn Văn" size="large" />
                </Item>
                <Item name="lastName" label="Tên:" rules={VALIDATION_RULES.NAME}>
                  <Input placeholder="A" size="large" />
                </Item>
              </div>
              <Item name="email" label="Email:" rules={VALIDATION_RULES.EMAIL}>
                <Input placeholder="Email" size="large" addonBefore={<MdOutlineMail className="inline" />} />
              </Item>
              <Item name="password" label="Mật khẩu:" rules={VALIDATION_RULES.PASSWORD}>
                <Password placeholder="Mật khẩu" size="large" addonBefore={<MdLockOutline className="inline" />} />
              </Item>
              <Item name="re_password" label="Nhập lại mật khẩu:" rules={VALIDATION_RULES.RE_PASSWORD}>
                <Password
                  placeholder="Nhập lại mật khẩu"
                  size="large"
                  addonBefore={<MdLockOutline className="inline" />}
                />
              </Item>
              <Button htmlType="submit" className="w-full" size="large" type="primary">
                Đăng ký
              </Button>
            </Form>
            <div className="mt-6 flex w-full justify-center">
              <Link href="/auth/login" className="text-center text-md text-blue-500">
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
