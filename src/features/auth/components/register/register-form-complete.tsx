"use client";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import LoginLoader from "../login/login-loader";
import { useState, useCallback, memo } from "react";
import { api } from "@/lib/api";
import Link from "next/link";

function RegisterFormHandle({ nickname }: { nickname: string }) {
  return (
    <div className="flex flex-col h-60 justify-between">
      <h1 className="font-bold text-xl">회원가입이 완료되었습니다.</h1>
      <div className="text-sm text-foreground/70">
        <p>
          {nickname}님의 회원가입이 성공적으로 완료되었습니다.
          <br />
          해당 계정으로 아르카디아의 모든 서비스에 접근할 수 있으며,
          <br />
          계정과 관련된 데이터는 모두 안전하게 관리됩니다.
        </p>
      </div>
      <div>
        <Link
          className={buttonVariants({ className: "w-full" })}
          href={"/login"}
        >
          로그인하러 가기
        </Link>
      </div>
    </div>
  );
}

export default memo(RegisterFormHandle);
