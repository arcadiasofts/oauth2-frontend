"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeChanger() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="flex justify-center items-center h-full">
      <button
        className="relative cursor-pointer h-fit w-fit flex items-center justify-center"
        onClick={() => setTheme(theme !== "light" ? "light" : "dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 top-0 left-0" />
      </button>
    </div>
  );
}
