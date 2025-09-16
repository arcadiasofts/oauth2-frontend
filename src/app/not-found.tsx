import { Suspense } from "react";
import Logo from "@/shared/brand/logo";
import ColorProvider from "@/shared/providers/color-provider";
import Link from "next/link";
import { buttonVariants } from "@/shared/ui/button";
import { BackButton } from "@/shared/ui/BackButton";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <Suspense fallback={null}>
        <ColorProvider />
      </Suspense>
      <Link
        href={"https://arcadiasofts.com/"}
        className="flex items-center gap-2"
      >
        <Logo className="fill-primary w-15" />
        <h2 className="font-bold text-2xl">Arcadiasofts.</h2>
      </Link>
      <h1 className="font-bold mt-4 text-sm text-center">
        저희 서버에서 요청하신 페이지를 찾을 수 없었습니다.
        <br />
        요청하신 URL이 올바른지 확인 후 다시 시도해 주세요
      </h1>
      <div className="flex gap-2">
        <Link href={"/"} className={buttonVariants()}>
          메인 페이지
        </Link>
        <BackButton />
      </div>
    </main>
  );
}