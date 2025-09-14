"use client";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { SidebarMenu } from "./sidebar/SidebarMenu";

export default function Sidebar() {
  return (
    <>
      <SidebarMenu />
      <SidebarFooter />
    </>
  );
}
