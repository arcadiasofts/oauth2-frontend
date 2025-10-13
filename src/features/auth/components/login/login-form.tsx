"use client";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useState } from "react";
import Link from "next/link";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { api } from "@/lib/api";
import { errors } from "@/const/errors";
import LoginLoader from "./login-loader";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useSearchParams();
  const redirectTo = params.get("redirect_to");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
    try {
      await api.post("/auth/login", {
        email,
        password,
        device_id,
        os,
      });
      setLoading(false);

      if (redirectTo) {
        window.location.href = redirectTo;
        return;
      }
      window.location.href = "/";
    } catch (error: any) {
      if (error.response.data.message == errors.INVALID_CREDENTIAL)
        setError("입력하신 이메일 혹은 비밀번호가 올바르지 않습니다.");
      else
        setError(
          `관리자에게 문의하세요. 에러 코드 : ${error.response.data.message}`
        );
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading ? <LoginLoader /> : <></>}
      <form className="md:flex-1 px-5 pt-12 md:pt-5" onSubmit={handleSubmit}>
        <div className="my-3 text-xs flex justify-between">
          <p>이메일</p>
        </div>
        <Input
          placeholder="아이디 혹은 이메일을 입력해주세요"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
        />
        <div className="my-3 text-xs flex justify-between">
          <p>비밀번호</p>
          <Link className="text-primary font-bold" href={"/find-pw"}>
            비밀번호를 잊으셨나요?
          </Link>
        </div>
        <Input
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
        />
        {error !== "" ? (
          <p className="text-destructive text-xs mt-3">{error}</p>
        ) : (
          <></>
        )}
        <Button
          className="w-full mt-5 cursor-pointer"
          type="submit"
          disabled={email === "" || password === "" || isLoading}
        >
          로그인
        </Button>
        <div className="flex items-center text-foreground/70 gap-3 text-xs my-2 ">
          <div className="h-[1px] flex-1 bg-foreground/20"></div>
          <p>또는</p>
          <div className="h-[1px] flex-1 bg-foreground/20"></div>
        </div>
        <Link
          href={`/login/passkey${
            redirectTo ? `?redirect_to=${redirectTo}` : ""
          }`}
          className={buttonVariants({
            variant: "secondary",
            className: "w-full cursor-pointer",
          })}
        >
          패스키로 로그인
        </Link>
        <div className="mt-5 mb-3 text-xs flex w-full justify-between">
          <a className="font-bold block text-black/30 dark:text-white/30 underline">
            로그인 관련 문제가 발생하셨나요?
          </a>
          <Link className="text-primary font-bold underline" href={"/register"}>
            계정이 없으신가요?
          </Link>
        </div>
      </form>
    </>
  );
}
