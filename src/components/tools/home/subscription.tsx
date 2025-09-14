import Link from "next/link";

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
        <div>
          <div className="bg-foreground/5 rounded-full flex items-center justify-center w-20 h-20 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="w-20 h-20 fill-green-400"
            >
              <path d="M160-640h640v-80H160v80Zm-80-80q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v240H160v240h164v80H160q-33 0-56.5-23.5T80-240v-480ZM598-80 428-250l56-56 114 112 226-226 56 58L598-80ZM160-720v480-180 113-413Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-border my-4"></div>
      <Link href={"/purchase"} className="text-primary font-bold">
        더 알아보기
      </Link>
    </div>
  );
}
