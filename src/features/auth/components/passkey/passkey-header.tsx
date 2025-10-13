import Logo from "@/shared/brand/logo";

export default function PasskeyHeader() {
  return (
    <div className="md:flex-1 md:px-5 pt-5 pb-1 md:pb-5 flex flex-col justify-between">
      <div>
        <Logo id="arcadia-logo" className="fill-primary w-14 mb-5" />
        <h1 className="font-bold text-xl">아르카디아 패스키</h1>
        <p className="text-sm font-bold py-1 text-foreground/50">
          패스키로 쉽고 간편하게, 그리고 안전하게.
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
