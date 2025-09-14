import SecurityManager from "@/components/tools/home/security-manager";
import SubscriptionManager from "@/components/tools/home/subscription";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-5">
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-5">
          <img
            className="w-32 h-32 object-cover rounded-full"
            src={
              "https://k.kakaocdn.net/dn/dcdixK/btsMAHGSopq/tei7YS5Qa1VpD5U2eNiRb1/img_640x640.jpg"
            }
          />
          <div className="flex flex-col gap-2 items-center">
            <h2 className="font-bold text-3xl">
              반가워요, <span className="text-primary">규연</span>님!
            </h2>
            <p>아르카디아와 연결된 계정의 정보를 손쉽게 관리해 보세요.</p>
          </div>
        </div>
      </div>
      <div className="flex mt-10 gap-4 px-30">
        <SecurityManager />
        <SubscriptionManager />
      </div>
      <p className="text-xs opacity-40 text-center mt-10">
        아르카디아 계정 정보는 본인 외엔 접근이 불가능합니다.
        <br />
        아르카디아는 사용자의 정보를 안전하게 보관합니다.
      </p>
    </main>
  );
}
