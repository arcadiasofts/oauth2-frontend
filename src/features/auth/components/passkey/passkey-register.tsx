"use client";

import { api } from "@/lib/api";
import { buttonVariants } from "@/shared/ui/button";
import { useUserStore } from "@/store/auth/user.store";
import {
  PublicKeyCredentialCreationOptionsJSON,
  startRegistration,
} from "@simplewebauthn/browser";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PasskeyRegister() {
  const { user } = useUserStore();

  return (
    <div className="flex-1 flex flex-col h-50 justify-between py-5">
      <h1 className="font-bold text-xl">패스키가 등록되었습니다.</h1>
      <div className="text-sm text-foreground/70">
        <p>
          {user.nickname}님의 패스키를 성공적으로 등록하였습니다.
          <br />
          해당 패스키로 아르카디아의 계정에 접근할 수 있습니다.
        </p>
      </div>
      <div>
        <Link className={buttonVariants({ className: "w-full" })} href={"/"}>
          메인 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}
