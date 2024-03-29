import AuthProvider from "@/contexts/auth.provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const configProps = {
  token: {
    fontFamily: inter.style.fontFamily,
    colorPrimary: "#8C20A4",
  },
};

export const metadata: Metadata = {
  title: {
    template: "%s | SRP - Scam Report Portal",
    default: "SRP - Scam Report Portal",
  },
  description: "Hệ thống báo cáo lừa đảo trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AuthProvider>
          <AntdRegistry>
            <ConfigProvider theme={configProps}>{children}</ConfigProvider>
          </AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
