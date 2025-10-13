import Logo from "@/shared/brand/logo";

export default function LoginHeader() {
  return (
    <div className="md:flex-1 px-5 pt-5 pb-1 md:pb-5 flex flex-col justify-between">
      <div>
        <Logo id="arcadia-logo" className="fill-primary w-14 mb-5" />
        <h1 className="font-bold text-xl">아르카디아에 로그인</h1>
        <p className="text-sm font-bold py-1 text-foreground/50">
          하나의 계정으로 수많은 서비스에 접근해 보세요.
        </p>
      </div>
      <p className="text-xs mt-5 text-start text-black/30 dark:text-white/30">
        Copyright © 2025{" "}
        <a className="underline" href="https://arcadiasofts.com">
          Arcadiasofts
        </a>
        . All rights reserved.
      </p>
    </div>
  );
}
