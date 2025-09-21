import AccountInfo from "@/features/account/components/account-info";
import ProfileDefaultInfo from "@/features/account/components/profile";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "계정 - 아르카디아 계정 관리",
};

export default function ProfilePage() {
  return (
    <main className="px-5 pt-10 md:px-30 pb-10">
      <h1 className="text-3xl font-bold">아르카디아 계정</h1>
      <ProfileDefaultInfo />
      <AccountInfo />
    </main>
  );
}
