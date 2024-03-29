import React from "react";

type CPTitleProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  description?: string;
};

export default function CPTitle({ children, style, description }: CPTitleProps) {
  return (
    <div style={style} className="flex w-fit flex-col items-center space-y-1">
      <h3 className="font-medium text-primary lg:text-2xl">{children}</h3>
      <span className="block h-[2px] w-1/3 rounded-md bg-secondary lg:h-1" />
      <span className="block h-[2px] w-2/3 rounded-md bg-secondary lg:h-1" />
      <p className="text-sm text-gray-400 lg:text-base">{description}</p>
    </div>
  );
}
