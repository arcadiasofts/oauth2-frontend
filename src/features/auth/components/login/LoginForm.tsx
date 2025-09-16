import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import Link from "next/link";

export default function LoginForm() {
  return (
    <div className="md:flex-1 px-5 pt-1 pb-5 md:pt-5">
      <div className="my-3 text-xs flex justify-between">
        <p>이메일</p>
      </div>
      <Input placeholder="아이디 혹은 이메일을 입력해주세요" type="email" />
      <div className="my-3 text-xs flex justify-between">
        <p>비밀번호</p>
        <Link className="text-primary font-bold" href={"/find-pw"}>
          비밀번호를 잊으셨나요?
        </Link>
      </div>
      <Input placeholder="비밀번호를 입력해주세요" type="password" />
      <a className="font-bold text-xs my-3 block text-black/30 dark:text-white/30 underline">
        로그인 관련 문제가 발생하셨나요?
      </a>
      <Button className="w-full mt-5 cursor-pointer">로그인</Button>
      <Button className="w-full mt-1 cursor-pointer" variant={"secondary"}>
        회원가입
      </Button>
      <p className="text-xs mt-5 text-center md:text-end text-black/30 dark:text-white/30">
        Copyright © 2025{" "}
        <a className="underline" href="https://arcadiasofts.com">
          Arcadiasofts
        </a>
        . All rights reserved.
      </p>
    </div>
  );
}
