import ProfileManager from "@/features/account/components/AccountManager";
import MainTitle from "@/features/main/components/title";
import HomeSearchbar from "@/features/search/components/searchbar";
import SecurityManager from "@/features/security/components/security-manager";
import SubscriptionManager from "@/features/subscription/components/subscription";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "메인 - 아르카디아 계정 관리",
};

export default function Home() {
  return (
    <main className="p-5">
      <MainTitle />
      <HomeSearchbar />
      <div className="mt-10 lg:px-30">
        <ProfileManager />
      </div>
      <div className="flex mt-4 gap-4 lg:px-30">
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
