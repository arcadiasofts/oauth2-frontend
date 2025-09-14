"use client";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { useEffect, useState } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("#application-header");
      if (header) {
        setHeaderHeight(header.clientHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  return (
    <div className="h-screen">
      <Header />
      <div
        className="flex relative"
        style={{ height: `calc(100% - ${headerHeight}px)` }}
      >
        <Sidebar />
        <div
          className="flex-1 overflow-scroll"
          style={{ height: `calc(100% - ${headerHeight}px)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
