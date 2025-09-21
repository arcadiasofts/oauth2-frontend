import { Button } from "@/shared/ui/button";
import ImageUploader from "@/shared/ui/image-upload";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로필 이미지 변경 - 아르카디아 계정 관리",
};

export default function SetProfilePage() {
  return (
    <main className="">
      <div className="flex flex-col my-10 items-center">
        <img
          className="w-52 h-52 object-cover rounded-full"
          src={
            "https://k.kakaocdn.net/dn/dcdixK/btsMAHGSopq/tei7YS5Qa1VpD5U2eNiRb1/img_640x640.jpg"
          }
        />
      </div>
      <div className="text-center mb-10 flex flex-col gap-1">
        <h1 className="text-center font-bold text-3xl">프로필 이미지 변경</h1>
        <p>프로필 이미지를 변경합니다.</p>
      </div>
      <div>
        <ImageUploader className="text-center py-20" />
        <Button className="mt-3 w-full">확인</Button>
      </div>
    </main>
  );
}
