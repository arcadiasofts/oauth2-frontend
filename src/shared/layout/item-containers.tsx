import Link from "next/link";
import React from "react";
import { TransitionLink } from "../ui/transition";

export function Container({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`border mt-10 rounded-md overflow-hidden${
        className ? " " + className : ""
      }`}
    >
      {title && (
        <div className="font-bold pb-3 mx-6 mt-6">
          <h2>{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}

export function ContainerItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <TransitionLink
      href={href}
      className="block px-6 cursor-pointer hover:bg-foreground/5 transition-colors"
    >
      {children}
    </TransitionLink>
  );
}
