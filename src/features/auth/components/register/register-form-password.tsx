"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import LoginLoader from "../login/login-loader";
import { useState, useCallback, memo } from "react";

type RegisterFormPasswordProps = {
  password: string;
  setPassword: (e: string) => void;
  toNext: () => void;
  toPrevious: () => void;
};

function RegisterFormPassword({
  password,
  setPassword,
  toNext,
  toPrevious,
}: RegisterFormPasswordProps) {
  const [repeatPass, setRepeatPass] = useState(password);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(async () => {
    if (password !== repeatPass) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    toNext();
  }, [toNext]);

  const handleToPrevious = useCallback(async () => {
    toPrevious();
  }, [toPrevious]);

  const onHandleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );
  const handleRepeatPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRepeatPass(e.target.value);
    },
    [setError, setRepeatPass]
  );

  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="my-3 text-xs flex justify-between">
            <p>비밀번호</p>
          </div>
          <Input
            placeholder="비밀번호를 입력해 주세요."
            onChange={onHandleChange}
            value={password}
            type="password"
          />{" "}
          <div className="my-3 text-xs flex justify-between">
            <p>비밀번호 확인</p>
          </div>
          <Input
            placeholder="다시 입력해 주세요."
            onChange={handleRepeatPassword}
            value={repeatPass}
            type="password"
          />
          {error && <p className="text-destructive text-xs mt-2">{error}</p>}
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
            disabled={password !== repeatPass || password.length === 0}
          >
            다음으로
          </Button>
        </div>
      </div>
    </>
  );
}

export default memo(RegisterFormPassword);
