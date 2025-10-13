"use client";
import SearchScreen from "@/features/search/components/search-screen";
import Header from "@/shared/layout/header";
import Sidebar from "@/shared/layout/sidebar";
import { RequireLogin } from "@/shared/providers/user-provider";
import { Suspense, useEffect, useState } from "react";

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
      <RequireLogin />
      <Header />
      <SearchScreen />
      <div
        className="flex relative"
        style={{ height: `calc(100% - ${headerHeight}px)` }}
      >
        <Sidebar />
        <div className="flex-1 overflow-y-scroll h-full">{children}</div>
      </div>
    </div>
  );
}
