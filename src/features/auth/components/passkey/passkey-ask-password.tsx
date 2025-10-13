"use client";
import { api } from "@/lib/api";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useUserStore } from "@/store/auth/user.store";
import { useState } from "react";
import LoginLoader from "../login/login-loader";
import { startRegistration } from "@simplewebauthn/browser";
import { errors } from "@/const/errors";

export default function PasskeyGetPassword({
  onSubmit,
}: {
  onSubmit: (e: {
    attestation?: any;
    successed: boolean;
    error?: string;
  }) => void;
}) {
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useUserStore();

  const handleSubmit = async () => {
    if (!user) {
      console.error("User not found");
      onSubmit({ successed: false, error: "사용자 정보를 찾을 수 없습니다." });
      return;
    }

    if (!onSubmit) return;

    setLoading(true);

    try {
      const res = await api.post("/passkey/register/options", {
        user_id: user.id,
        user_password: password,
      });
      const options = res.data;

      const attestation = await startRegistration(options);
      const verificationRes = await api.post("passkey/register/verify", {
        response: attestation,
      });
      console.log(verificationRes);
      onSubmit({ attestation, successed: true });
    } catch (error: any) {
      if (error.response.data.message === errors.INVALID_PASSWORD) {
        setError("비밀번호가 올바르지 않습니다.");
        setLoading(false);
        return;
      }
      setError(`에러가 발생하였습니다 : ${error.message}`);
      console.error("Passkey registration failed:", error);
      let errorMessage =
        "패스키 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.";
      if (error.name === "NotAllowedError") {
        errorMessage = "패스키 등록이 사용자에 의해 취소되었습니다.";
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      onSubmit({ successed: false, error: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-3 justify-between py-3">
      {isLoading && <LoginLoader />}
      <h2 className="font-bold">계정 소유주 인증</h2>
      <div className="flex flex-col gap-3">
        <div className="text-xs flex justify-between">
          <p>비밀번호</p>
        </div>
        <Input
          placeholder="비밀번호를 입력해 주세요."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          disabled={isLoading}
        />
        {error !== "" && <p className="text-xs text-red-500">{error}</p>}
      </div>
      <Button
        className="cursor-pointer"
        onClick={handleSubmit}
        disabled={isLoading || !password || !user}
      >
        비밀번호 확인
      </Button>
    </div>
  );
}
