import { Spin } from "antd";
import React from "react";

export type TCPListData = {
  key: string | number;
  title: React.ReactNode;
  content: React.ReactNode;
};

export function CPListData({ data, title, loading }: { data: TCPListData[]; title?: string; loading?: boolean }) {
  const length = data.length - 1;
  return (
    <>
      {title && (
        <div className="rounded-md rounded-b-none border-2 border-b-0 bg-slate-50 px-3 py-2 text-xl font-bold text-primary">
          {title}
        </div>
      )}
      {loading ? (
        <div className="flex h-80 w-full items-center justify-center rounded-b-md border-2 bg-slate-50">
          <Spin />
        </div>
      ) : (
        data.map((item, idx) => (
          <div
            key={item.key}
            className={`flex overflow-hidden border-2 ${idx !== 0 && "border border-t-0"} ${idx === 0 && !title && "rounded-t-md"} ${idx === length && "rounded-b-md"}`}
          >
            <div className="w-2/5 border-r bg-slate-50 p-2 lg:w-1/6">
              <div className="flex h-full w-full items-center font-medium">
                <p>{item.title}</p>
              </div>
            </div>
            <div className="flex-1 p-2">
              <p>{item.content}</p>
            </div>
          </div>
        ))
      )}
    </>
  );
}
