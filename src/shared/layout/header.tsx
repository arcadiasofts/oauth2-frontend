import React from "react";
import { FloatingThemeChanger } from "./header/FloatingThemeChanger";
import { HeaderBrand } from "./header/HeaderBrand";
import { UserNav } from "./header/UserNav";
import ColorProvider from "@/shared/providers/color-provider";

export default function Header() {
  return (
    <>
      <FloatingThemeChanger />
      <header
        className="p-6 flex items-center justify-between"
        id="application-header"
      >
        <HeaderBrand />
        <UserNav />
      </header>
    </>
  );
}
