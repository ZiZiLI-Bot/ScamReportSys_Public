"use client";
import React from "react";
import { Image, Watermark } from "antd";

const { PreviewGroup } = Image;

export function CPImageList({ images }: { images: string[] | undefined }) {
  return (
    <PreviewGroup>
      <div className="mt-4 flex flex-wrap items-center">
        {images?.map((img, index) => (
          <Watermark className="w-1/2 md:w-56" key={index} content="SCAM!" gap={[30, 50]}>
            <div className="mb-2 mr-2 overflow-hidden">
              <Image crossOrigin="anonymous" className="w-full overflow-hidden rounded-md" src={img} alt="Bằng chứng" />
            </div>
          </Watermark>
        ))}
      </div>
    </PreviewGroup>
  );
}
