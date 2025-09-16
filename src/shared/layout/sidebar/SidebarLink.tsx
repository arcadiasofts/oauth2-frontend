import Link from "next/link";
import React from "react";

export function SidebarLink({
  children,
  href,
  isActive,
}: {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
}) {
  return (
    <Link
      className={`py-4 pl-5 pr-10 w-full font-semibold transition-colors flex gap-3 items-center ${
        isActive ? "active-link bg-foreground/5" : "hover:bg-foreground/5"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
