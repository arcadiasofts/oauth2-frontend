import AccountSecurityInfo from "@/features/security/components/account-info";
import SecurityChangePassowordBtn from "@/features/security/components/change-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "계정 - 아르카디아 계정 관리",
};

export default function ProfilePage() {
  return (
    <main className="px-5 pt-10 md:px-30 pb-10">
      <h1 className="text-3xl font-bold">계정 보안</h1>
      <AccountSecurityInfo />
      <SecurityChangePassowordBtn />
    </main>
  );
}
