import ChangeProfileImage from "@/features/profile/components/change-profile-image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로필 이미지 변경 - 아르카디아 계정 관리",
};

export default function SetProfilePage() {
  return (
    <main className="">
      <ChangeProfileImage />
    </main>
  );
}
