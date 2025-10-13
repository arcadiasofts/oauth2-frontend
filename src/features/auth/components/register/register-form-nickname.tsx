"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import LoginLoader from "../login/login-loader";
import { useState, useCallback, memo } from "react";

type RegisterFormNicknameProps = {
  nickname: string;
  setNickname: (e: string) => void;
  toNext: () => void;
  toPrevious: () => void;
};

function RegisterFormNickname({
  nickname,
  setNickname,
  toNext,
  toPrevious,
}: RegisterFormNicknameProps) {
  const handleSubmit = useCallback(async () => {
    toNext();
  }, [toNext]);

  const handleToPrevious = useCallback(async () => {
    toPrevious();
  }, [toPrevious]);

  const onHandleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
    },
    [setNickname]
  );

  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="my-3 text-xs flex justify-between">
            <p>닉네임</p>
          </div>
          <Input
            placeholder="다른 유저들이 당신을 뭐라고 불러야 할까요?"
            onChange={onHandleChange}
            value={nickname}
            type="text"
          />
        </div>
        <div>
          <Button
            className="w-full mt-5 cursor-pointer"
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
            disabled={nickname === ""}
          >
            다음으로
          </Button>
        </div>
      </div>
    </>
  );
}

export default memo(RegisterFormNickname);
