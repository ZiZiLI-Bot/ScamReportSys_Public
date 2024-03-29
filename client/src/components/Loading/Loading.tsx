import { Spin } from "antd";
import React from "react";

export function Loading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Spin size="large" />
      <p>Đang tải...</p>
    </div>
  );
}
