import Image from "next/image";
import Link from "next/link";

import card from "$/asset/wallet.svg";

export default function SubscriptionManager() {
  return (
    <div className="border rounded-md w-full flex-1 p-4 h-full">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            {2}개의 멤버십을 구독 중입니다.
          </h3>
          <p className="text-sm mt-4">
            루더스 플러스 멤버십을 포함한
            <br />
            여러 멤버십들을 관리해 보세요.
          </p>
        </div>
        <div className="bg-foreground/5 rounded-full flex items-center justify-center w-20 h-20 relative">
          <Image src={card} className="w-12 z-10 relative" alt="shield_no" />
        </div>
      </div>
      <div className="w-full h-[1px] bg-border my-4"></div>
      <Link href={"/purchase"} className="text-primary font-bold">
        더 알아보기
      </Link>
    </div>
  );
}
