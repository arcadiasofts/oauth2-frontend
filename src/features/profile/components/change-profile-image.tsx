"use client";

import { api } from "@/lib/api";
import { Button } from "@/shared/ui/button";
import ImageUploader from "@/shared/ui/image-upload";
import { useUserStore } from "@/store/auth/user.store";
import { useState } from "react";

export default function ChangeProfileImage() {
  const { user } = useUserStore();
  const [key, setKey] = useState("");
  const handleChange = async ({ key }: { key: string }) => {
    console.log(key);
    setKey(key);
  };
  const handleUpload = async () => {
    console.log(key);
    await api.post("preference/update-profile", {
      key,
    });
  };
  return (
    <>
      <div className="flex flex-col my-5 items-center">
        <img
          className="w-40 h-40 object-cover rounded-full"
          src={user.profile["512"] ?? "none"}
        />
      </div>
      <div className="text-center mb-5 flex flex-col gap-1">
        <h1 className="text-center font-bold text-3xl">프로필 이미지 변경</h1>
        <p>프로필 이미지를 변경합니다.</p>
      </div>
      <div>
        <ImageUploader onUpload={handleChange} className="text-center py-5" />
        <Button onClick={handleUpload} className="mt-3 w-full cursor-pointer">
          업로드
        </Button>
        <Button className="mt-2 w-full cursor-pointer" variant={"secondary"}>
          기본값으로 설정
        </Button>
      </div>
    </>
  );
}
