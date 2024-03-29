import { Header } from "@/components/Header";
import React from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <Header style={{ position: "fixed" }} />
      {children}
    </main>
  );
}
