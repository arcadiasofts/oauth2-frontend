"use client";
import { useUserStore } from "@/store/auth/user.store";

export default function MainTitle() {
  const { user } = useUserStore();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-5">
        <img
          className="w-32 h-32 object-cover rounded-full"
          src={user.profile["512"] || "none"}
          alt="User profile image"
          width={128}
          height={128}
        />
        <div className="flex flex-col gap-2 items-center">
          <h2 className="font-bold text-3xl">
            반가워요, <span className="text-primary">{user.nickname}</span>님!
          </h2>
          <p>아르카디아와 연결된 계정의 정보를 손쉽게 관리해 보세요.</p>
        </div>
      </div>
    </div>
  );
}
