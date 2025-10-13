"use client";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useState } from "react";
import LoginLoader from "../login/login-loader";
import Link from "next/link";
import { api } from "@/lib/api";
import { errors } from "@/const/errors";
import { startAuthentication } from "@simplewebauthn/browser";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useSearchParams } from "next/navigation";

export default function PasskeyLoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useSearchParams();
  const redirectTo = params.get("redirect_to");
  const handleSubmit = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("올바른 이메일 형식이 아닙니다.");
      return;
    }
    try {
      const res = await api.get(`/user/get-user-with-email?email=${email}`);
      const user_id = res.data.user;
      const options = await api.post("/passkey/login/options", {
        user_id,
      });
      console.log(options);
      const attestation = await startAuthentication(options.data);
      const fp = await FingerprintJS.load();
      const device_id = (await fp.get()).visitorId;
      const userAgent = navigator.userAgent;
      let os = "UNKNOWN";
      if (userAgent.indexOf("Win") !== -1) {
        os = "Windows";
      } else if (userAgent.indexOf("Mac") !== -1) {
        os = "MacOS";
      } else if (userAgent.indexOf("Linux") !== -1) {
        os = "Linux";
      } else if (userAgent.indexOf("Android") !== -1) {
        os = "Android";
      } else if (userAgent.indexOf("like Mac") !== -1) {
        os = "iOS";
      }
      const verifyRes = await api.post("/passkey/login/verify", {
        response: attestation,
        device_id,
        email,
        os,
      });
      console.log(verifyRes);
      if (redirectTo) {
        window.location.href = redirectTo;
        return;
      }
      window.location.href = "/";
    } catch (error: any) {
      if (error.response.data.message === errors.INVALID_USER) {
        setError("올바른 이메일이 아닙니다.");
        return;
      }
    }
  };
  return (
    <div className="flex-1 flex flex-col justify-between">
      {isLoading && <LoginLoader />}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="text-xs flex justify-between">
            <p>이메일</p>
          </div>
          <Input
            placeholder="이메일을 입력해 주세요."
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            value={email}
            disabled={isLoading}
          />
        </div>
        {error !== "" && <p className="text-xs text-red-500">{error}</p>}
      </div>{" "}
      <Button
        className="w-full mt-5 cursor-pointer"
        type="submit"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        패스키로 로그인
      </Button>
      <div className="flex items-center text-foreground/70 gap-3 text-xs my-2 ">
        <div className="h-[1px] flex-1 bg-foreground/20"></div>
        <p>또는</p>
        <div className="h-[1px] flex-1 bg-foreground/20"></div>
      </div>
      <Link
        href={`/login${redirectTo ? `?redirect_to=${redirectTo}` : ""}`}
        className={buttonVariants({
          variant: "secondary",
          className: "w-full cursor-pointer",
        })}
      >
        비밀번호로 로그인
      </Link>
      <div className="mt-5 mb-3 text-xs flex w-full justify-between">
        <a className="font-bold block text-black/30 dark:text-white/30 underline">
          로그인 관련 문제가 발생하셨나요?
        </a>
        <Link className="text-primary font-bold underline" href={"/register"}>
          계정이 없으신가요?
        </Link>
      </div>
    </div>
  );
}
