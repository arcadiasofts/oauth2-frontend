"use client";
import SearchScreen from "@/features/search/components/search-screen";
import Header from "@/shared/layout/header";
import Sidebar from "@/shared/layout/sidebar";
import TabHeader from "@/shared/layout/tab-header";
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
      <TabHeader />
      <SearchScreen />
      <div className="flex justify-center items-center">
        <div className="md:border p-3 my-10 w-full max-w-[600px] rounded-md h-fit">
          {children}
        </div>
      </div>
      <footer className="py-10 text-sm text-center text-foreground/50">
        <p>Copyright © Arcadiasofts 2025 - Current.</p>
      </footer>
    </div>
  );
}
