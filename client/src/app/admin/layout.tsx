"use client";
import { useAuth } from "@/hooks/useAuth.hook";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Spin, Tooltip } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { DASHBOARD_ITEMS } from "./constants";

const { Header, Content, Footer, Sider } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isInitialize } = useAuth();

  const handleSelect = (value: string) => {
    router.push(value);
  };

  return (
    <Layout className="h-screen w-full">
      <Sider breakpoint="lg" collapsedWidth="0">
        <Link href="/admin">
          <p className="text-center text-3xl font-bold text-primary">SRP</p>
        </Link>
        <Menu
          onSelect={(value) => handleSelect(value.key)}
          theme="dark"
          mode="inline"
          items={DASHBOARD_ITEMS}
          selectedKeys={[pathname]}
        />
      </Sider>
      <Layout>
        <Header className="flex items-center justify-between bg-secondary p-0 px-8">
          <div className="p-4 text-2xl font-bold text-primary">SRP Project</div>
          <div className="flex items-center space-x-4 text-primary">
            <Tooltip title="Trang chủ">
              <Link href="/">
                <Button type="text" icon={<FaHome className="inline text-primary" size={20} />} />
              </Link>
            </Tooltip>
            {isInitialize ? (
              <Spin />
            ) : (
              <>
                <Avatar size="large" style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                <p className="text-base font-bold">{user?.name}</p>
              </>
            )}
            <Tooltip title="Đăng xuất">
              <Button type="text" icon={<MdOutlineLogout className="inline text-red-700" size={24} />} />
            </Tooltip>
          </div>
        </Header>
        <Content className="mx-4 mt-6">
          <div className="h-full w-full overflow-auto rounded-md bg-white p-4 shadow-md">{children}</div>
        </Content>
        <Footer className="text-center">SRP Project ©{new Date().getFullYear()} </Footer>
      </Layout>
    </Layout>
  );
}
