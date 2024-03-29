/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import LOGIN_ICON from "@/assets/images/LoginIIL.svg";
import { TAuthUser } from "@/contexts/auth.context";
import { signIn } from "@/contexts/auth.reducer";
import { useAuth } from "@/hooks/useAuth.hook";
import { Button, Checkbox, Divider, Form, Input, Spin, notification } from "antd";
import { Rule } from "antd/es/form";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, Suspense, useEffect } from "react";
import { MdLockOutline, MdOutlineArrowBack, MdOutlineMail } from "react-icons/md";
import { Login, type LoginFiled } from "./actions";

const { Item } = Form;
const { Password } = Input;

const backgroundStyle: CSSProperties = {
  background: "linear-gradient(56deg, rgba(161,140,209,1) 45%, rgba(251,194,235,1) 94%)",
};

class VALIDATION_RULES {
  static EMAIL: Rule[] = [
    { required: true, message: "Vui lòng nhập email" },
    { type: "email", message: "Email không hợp lệ" },
  ];
  static PASSWORD: Rule[] = [
    { required: true, message: "Vui lòng nhập mật khẩu" },
    { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
  ];
}

function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dispatch } = useAuth();

  useEffect(() => {
    if (searchParams.has("redirect")) {
      notification.warning({
        message: "Vui lòng đăng nhập để tiếp tục!",
        description: "Bạn cần đăng nhập để truy cập trang này",
      });
    }
  }, []);
  const onFinish = async (values: LoginFiled) => {
    try {
      const res = await Login(values);
      if (res.success) {
        const user: TAuthUser = {
          _id: res.data?._id,
          email: res.data?.email,
          role: res.data?.role,
          name: res.data?.user?.firstName + " " + res.data?.user?.lastName,
          user_id: res.data?.user?._id,
        };
        dispatch(signIn({ isAuthenticated: true, user }));

        notification.success({
          message: "Đăng nhập thành công!",
          description: `Chào mừng ${user.name} đến với SRP Project!`,
        });

        if (searchParams.has("redirect")) {
          router.push(searchParams.get("redirect")!);
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      notification.error({
        message: "Tài khoản hoặc mật khẩu không chính xác!",
        description: "Vui lòng kiểm tra lại",
      });
    }
  };
  return (
    <div style={backgroundStyle} className="flex h-screen w-full items-center justify-center">
      <div className="mx-3 w-full overflow-hidden rounded-xl bg-white shadow-xl lg:h-4/6 lg:w-3/5">
        <div className="flex items-center space-x-2 bg-secondary p-2">
          <MdOutlineArrowBack size={20} onClick={() => router.back()} className="cursor-pointer" />
          <p className="text-base font-medium">SRP Project</p>
        </div>
        <div className="flex h-full">
          <div className="hidden h-full w-2/5 items-center justify-center md:flex">
            <Image alt="Login icon" src={LOGIN_ICON} width={300} />
          </div>
          <div className="flex h-full w-full flex-col p-4 md:w-3/5">
            <h2 className="text-2xl font-bold">Đăng nhập</h2>
            <Form
              onFinish={onFinish}
              className="mt-3 h-3/4 md:mt-8"
              layout="vertical"
              requiredMark={false}
              initialValues={{ remember: true }}
              size="small"
            >
              <Item<LoginFiled> name="email" label="Email:" rules={VALIDATION_RULES.EMAIL}>
                <Input placeholder="Email" size="large" addonBefore={<MdOutlineMail className="inline" />} />
              </Item>
              <Item<LoginFiled> name="password" label="Mật khẩu:" rules={VALIDATION_RULES.PASSWORD}>
                <Password placeholder="Mật khẩu" size="large" addonBefore={<MdLockOutline className="inline" />} />
              </Item>
              <Item<LoginFiled> name="remember" valuePropName="checked">
                <Checkbox>Nhớ tài khoản</Checkbox>
              </Item>
              <div className="my-2 flex justify-end">
                <Link href="/auth/forgot-password" className="text-md">
                  Quên mật khẩu?
                </Link>
              </div>
              <Button htmlType="submit" className="w-full" size="large" type="primary">
                Đăng nhập
              </Button>
              <Divider className="lg:my-2" />
            </Form>
            <div className="flex w-full justify-center">
              <Link href="/auth/register" className="text-center text-md text-blue-500">
                Đăng ký tài khoản
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WarperLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Spin />
        </div>
      }
    >
      <LoginPage />
    </Suspense>
  );
}
