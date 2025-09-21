"use client";

import { themes } from "@/const/theme/themes";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function ColorProvider() {
  const { resolvedTheme } = useTheme();
  const params = useSearchParams();
  const theme = params.get("theme") as keyof typeof themes;

  useEffect(() => {
    const applyTheme = (themeMode: "light" | "dark") => {
      if (theme && themes[theme]) {
        const root = document.documentElement;
        const currentTheme = themes[theme];
        const themeColors = currentTheme[themeMode];
        Object.entries(themeColors).forEach(([key, value]) => {
          console.log(`${themeMode} / key : ${key}, value: ${value}`);
          root.style.setProperty(`--${key}`, String(value));
        });
      }
    };

    if(!theme) return;

    if (resolvedTheme === "light" || resolvedTheme === "dark") {
      applyTheme(resolvedTheme);
    }

    // 모든 href에 현재 테마를 적용시킵니다.
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href) {
        const url = new URL(href, window.location.origin);
        url.searchParams.set("theme", theme);
        link.setAttribute("href", url.pathname + url.search);
      }
    });
  }, [theme, resolvedTheme]);

  return <></>;
}
