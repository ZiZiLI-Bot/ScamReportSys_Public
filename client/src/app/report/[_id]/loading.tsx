import { Spin } from "antd";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-3">
      <Spin />
      <p>Đang tải...</p>
    </div>
  );
}
