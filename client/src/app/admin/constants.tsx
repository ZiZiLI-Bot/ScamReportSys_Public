import { Tag } from "antd";
import React from "react";
import { GrDocumentVerified } from "react-icons/gr";
import { IoNewspaperOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineReviews } from "react-icons/md";

export const DASHBOARD_ITEMS = [
  {
    key: "/admin/approve-reports",
    icon: React.createElement(GrDocumentVerified, {
      className: "inline",
    }),
    label: "Duyệt bài đăng",
  },
  {
    key: "/admin/report-manager",
    icon: React.createElement(IoNewspaperOutline, {
      className: "inline",
    }),
    label: "Quản lý bài đăng",
  },
  {
    key: "/admin/review",
    icon: React.createElement(MdOutlineReviews, {
      className: "inline",
    }),
    label: "Quản lý đánh giá",
  },
  {
    key: "/admin/system",
    icon: React.createElement(IoSettingsOutline, {
      className: "inline",
    }),
    label: "Hệ thống",
  },
];

export const TIME_FORMAT = "HH:mm DD/MM/YYYY";

export const StatusTag = ({ status }: { status: string | undefined }) => {
  switch (status) {
    case "approved":
      return <Tag color="green">Đã duyệt</Tag>;
    case "pending":
      return <Tag color="yellow">Chờ duyệt</Tag>;
    case "rejected":
      return <Tag color="red">Từ chối</Tag>;
    default:
      return <Tag color="blue">Không xác định</Tag>;
  }
};
