"use client";
import { useAuth } from "@/hooks/useAuth.hook";
import { Button, Drawer } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { CSSProperties, useEffect, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import UserView from "../UserView/UserView";
import { NAV_ITEMS } from "./constants";

const SCROLL_THRESHOLD = 170;

const animate = "transition-all duration-300 ease-in-out";

export function Header({ style, isChangeColor }: { style?: CSSProperties; isChangeColor?: boolean }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isThreshold, setIsThreshold] = useState(!isChangeColor || false);
  const { isAuthenticated } = useAuth();

  const router = useRouter();

  const handleScroll = () => {
    if (window.scrollY >= SCROLL_THRESHOLD) {
      setIsThreshold(true);
    } else {
      setIsThreshold(false);
    }
  };

  useEffect(() => {
    if (isChangeColor) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isChangeColor]);

  return (
    <div
      style={style}
      className={`fixed top-0 z-10 flex h-16 w-full items-center justify-between rounded-b-lg px-4 ${animate} lg:px-20 ${isThreshold ? "bg-secondary text-black" : "bg-none text-white"}`}
    >
      <div className="flex items-center space-x-1">
        <Button
          className="lg:hidden"
          type="text"
          icon={<RiMenu3Fill className={`text-xl ${animate} ${isThreshold ? "text-black" : "text-white"}`} />}
          onClick={() => setOpenDrawer(true)}
        />
        <h2 onClick={() => router.push("/")} className="cursor-pointer select-none text-2xl font-bold">
          SRP
        </h2>
      </div>
      <div className="flex items-center space-x-14">
        <div className="hidden items-center space-x-14 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link href={item.path} key={item.path}>
              <p className={`text-base font-medium ${animate} ${isThreshold ? "text-black" : "text-white"}`}>
                {item.label}
              </p>
            </Link>
          ))}
        </div>
        {isAuthenticated ? (
          <UserView />
        ) : (
          <Link href="/auth/login">
            <Button type="primary">Đăng nhập</Button>
          </Link>
        )}
      </div>
      <DrawerMenu open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
}

type DrawerMenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, setOpen }) => {
  return (
    <Drawer
      title="SRP Project"
      placement="left"
      onClose={() => setOpen(false)}
      open={open}
      width={"70%"}
      key="DrawerMenu"
    >
      <div className="flex flex-col space-y-4">
        {NAV_ITEMS.map((item) => (
          <Link href={item.path} key={item.path}>
            <Button type="link" size="large" className="text-base font-medium text-black">
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </Drawer>
  );
};
