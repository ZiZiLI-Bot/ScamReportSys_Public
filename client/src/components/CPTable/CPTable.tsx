"use client";
import { Table, TableProps } from "antd";
import React from "react";

type TTableProps = {
  data: any[] | undefined;
  columns: any[];
  loading?: boolean;
  onChange?: TableProps["onChange"] | undefined;
  pagination?: {
    pageSize?: number;
    total?: number;
  };
};

export function CPTable({ data, columns, loading, onChange, pagination }: TTableProps) {
  return (
    <div>
      <Table
        size="small"
        onChange={onChange}
        pagination={{
          ...pagination,
          showSizeChanger: false,
          position: ["bottomLeft"],
        }}
        rowKey={(record) => record._id}
        bordered
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </div>
  );
}
