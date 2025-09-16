"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";

export function ThemeChanger() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant={"ghost"}
      className="relative cursor-pointer h-10 w-10 flex items-center justify-center"
      onClick={() => setTheme(theme !== "light" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:opacity-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </Button>
  );
}
