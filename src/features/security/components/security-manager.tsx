import Link from "next/link";
import Image from "next/image";

import shield_ok from "$/asset/shield_ok.svg";
import shield_no from "$/asset/shield_no.svg";

const icon = {
  check: (
    <Image src={shield_ok} className="w-10  z-10 relative" alt="shield_ok" />
  ),
  warn: (
    <Image src={shield_no} className="w-10 z-10 relative" alt="shield_no" />
  ),
};

export default function SecurityManager() {
  return (
    <div className="border rounded-md w-full flex-1 p-4 h-full">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            <span className="text-destructive">{3}</span>개의 보안 문제를
            찾았습니다.
          </h3>
          <p className="text-sm mt-4">
            계정과 관련된 보안 문제가 있습니다.
            <br />
            보안 문제를 확인하고 보완하세요
          </p>
        </div>
        <div className="bg-foreground/5 rounded-full flex items-center justify-center pt-1 w-20 h-20 relative">
          {icon.warn}
        </div>
      </div>
      <div className="w-full h-[1px] bg-border my-4"></div>
      <Link href={"/"} className="text-primary font-bold">
        더 알아보기
      </Link>
    </div>
  );
}
