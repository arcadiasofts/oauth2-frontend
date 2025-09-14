"use client";

import { themes } from "@/const/theme/themes";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function ColorProvider() {
  const params = useSearchParams();
  const theme = params.get("theme") as keyof typeof themes;
  useEffect(() => {
    if (theme && themes[theme]) {
      // 요청된 테마를 페이지에 적용시킵니다.
      const root = document.documentElement;
      const darkElement = document.querySelector(".dark") as HTMLElement | null;
      const currentTheme = themes[theme];
      Object.entries(currentTheme.light).forEach(([key, value]) => {
        console.log(`key : ${key}, value: ${value}`);
        root.style.setProperty(`--${key}`, String(value));
      });
      if (darkElement) {
        Object.entries(currentTheme.dark).forEach(([key, value]) => {
          console.log(`dark / key : ${key}, value: ${value}`);
          darkElement.style.setProperty(`--${key}`, String(value));
        });
      }

      // 모든 href를 업데이트합니다.
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (href) {
          const url = new URL(href, window.location.origin);
          url.searchParams.set("theme", theme);
          link.setAttribute("href", url.pathname + url.search);
        }
      });
    }
  }, [theme]);
  return <></>;
}
