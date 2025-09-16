"use client";

import Link from "next/link";
import { buttonVariants } from "@/shared/ui/button";

export function BackButton() {
  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.history.back();
      }}
      className={buttonVariants({ variant: "outline" })}
    >
      이전 페이지로 돌아가기
    </Link>
  );
}
