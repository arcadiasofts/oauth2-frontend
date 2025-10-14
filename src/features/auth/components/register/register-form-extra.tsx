"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import LoginLoader from "../login/login-loader";
import { useState, useCallback, memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { api } from "@/lib/api";
import { errors } from "@/const/errors";

type RegisterFormExtraProps = {
  email: string;
  handle: string;
  nickname: string;
  password: string;
  identityVerificationId: string;
  toPrevious: () => void;
  toNext: () => void;
};

function RegisterFormExtra({
  email,
  handle,
  nickname,
  password,
  identityVerificationId,
  toPrevious,
  toNext,
}: RegisterFormExtraProps) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.post("auth/register", {
        handle,
        nickname,
        email,
        password,
        identity_verification_id: identityVerificationId,
      });
      if (!res.data.registered) {
        setError("회원가입 중 문제가 발생하였습니다.");
        return;
      }
      setLoading(false);
      toNext();
    } catch (error: any) {
      const errorcode: any = error.response.data.message;
      if (errorcode === errors.INVALID_CERTIFICATION) {
        setError(
          "이메일이 인증되지 않았습니다. 세로고침 후 다시 시도해주세요."
        );
        setLoading(false);
        return;
      } else if (errorcode == errors.TOO_YOUNG) {
        setError("14세 미만은 회원 가입이 불가능합니다.");
        setLoading(false);
        return;
      } else if (errorcode == errors.TOO_YOUNG) {
        setError("14세 미만은 회원 가입이 불가능합니다.");
        setLoading(false);
        return;
      } else if (errorcode == errors.ALREADY_REGISTERED) {
        setError("이미 해당 명의로 가입된 계정이 존재합니다.");
        setLoading(false);
        return;
      }
      setError(
        `회원가입에 문제가 발생하였습니다 : ${error.response.data.message}`
      );
      setLoading(false);
    }
  }, []);

  const handleToPrevious = useCallback(async () => {
    toPrevious();
  }, [toPrevious]);

  return (
    <>
      <LoginLoader isActive={isLoading} />
      <div className="h-full flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-9">이 정보가 확실한가요?</h2>
        <div className="flex flex-col gap-2">
          <div className="flex text-sm justify-between text-foreground/70">
            <p className="font-bold">이메일</p>
            <p>{email}</p>
          </div>
          <div className="flex text-sm justify-between text-foreground/70">
            <p className="font-bold">핸들</p>
            <p>{handle}</p>
          </div>
          <div className="flex text-sm justify-between text-foreground/70">
            <p className="font-bold">닉네임</p>
            <p>{nickname}</p>
          </div>
          {error !== "" ? (
            <p className="text-xs text-destructive">{error}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="mt-5">
          <Button
            className="w-full mt-2 cursor-pointer"
            type="submit"
            variant={"secondary"}
            onClick={handleToPrevious}
          >
            이전으로
          </Button>
          <Button
            className="w-full mt-2 cursor-pointer"
            type="submit"
            onClick={handleSubmit}
          >
            회원가입
          </Button>
        </div>
      </div>
    </>
  );
}

export default memo(RegisterFormExtra);
