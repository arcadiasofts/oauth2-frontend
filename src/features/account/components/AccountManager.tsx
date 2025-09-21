import Image from "next/image";
import Link from "next/link";

import palette from "$/asset/paint.svg";
import { TransitionLink } from "@/shared/ui/transition";

export default function ProfileManager() {
  return (
    <div className="border rounded-md w-full flex-1 p-4 h-full">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold">개성을 표현해 보세요</h3>
          <p className="text-sm mt-4">
            아르카디아는 강력한 커스텀 프로필 설정을 지원합니다.
            <br />
            규연님만의 개성을 프로필 설정을 통해 표현해 보세요.
          </p>
        </div>
        <div className="bg-foreground/5 rounded-full flex items-center justify-center w-20 h-20 relative">
          <Image
            src={palette}
            className="w-12 h-12 z-10 relative"
            alt="shield_no"
          />
        </div>
      </div>
      <div className="w-full h-[1px] bg-border my-4"></div>
      <Link href={"/account"} className="text-primary font-bold">
        더 알아보기
      </Link>
    </div>
  );
}
