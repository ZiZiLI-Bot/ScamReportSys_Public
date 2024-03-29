import { createElement } from "react";
import { IoDocumentTextOutline, IoLogOutOutline, IoPersonCircleOutline } from "react-icons/io5";

export const NAV_ITEMS = [
  {
    label: "Trang chủ",
    path: "/",
  },
  {
    label: "Giới thiệu",
    path: "/gioi-thieu",
  },
  {
    label: "Điều khoản",
    path: "/dieu-khoan-su-dung",
  },
];

type TMenu = {
  title: string;
  icon: JSX.Element;
  action: string;
};

export const USER_MENUS = (role: string | undefined): TMenu[] => {
  if (role === "admin") {
    return [
      {
        title: "Admin Dashboard",
        icon: createElement(IoPersonCircleOutline, { className: "inline mb-1" }),
        action: "admin_dashboard",
      },
      {
        title: "Báo cáo đã tạo",
        icon: createElement(IoDocumentTextOutline, { className: "inline mb-1" }),
        action: "my_report",
      },
      { title: "Đăng xuất", icon: createElement(IoLogOutOutline, { className: "inline mb-1" }), action: "sign_out" },
    ];
  } else {
    return [
      {
        title: "Báo cáo đã tạo",
        icon: createElement(IoDocumentTextOutline, { className: "inline mb-1" }),
        action: "my_report",
      },
      { title: "Đăng xuất", icon: createElement(IoLogOutOutline, { className: "inline mb-1" }), action: "sign_out" },
    ];
  }
};
