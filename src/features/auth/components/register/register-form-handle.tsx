"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import LoginLoader from "../login/login-loader";
import { useState, useCallback, memo } from "react";
import { api } from "@/lib/api";

type RegisterFormHandleProps = {
  handle: string;
  setHandle: (e: string) => void;
  toNext: () => void;
};

function RegisterFormHandle({
  handle,
  setHandle,
  toNext,
}: RegisterFormHandleProps) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(async () => {
    setError("");
    const regex = /^[a-zA-Z0-9._]{1,20}$/;
    if (!regex.test(handle)) {
      setError(
        "핸들은 영문, 숫자, _, .가 포함된 20자 미만의 문자열만 사용 가능합니다."
      );
      return;
    }
    setLoading(true);
    try {
      const res = await api.get(`verify/is-handle-available?handle=${handle}`);
      if (!res.data.is_available) {
        setError("사용할 수 없는 핸들입니다.");
        return;
      }
      toNext();
    } catch (err: any) {
      setError(err.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [handle, toNext]);

  const onHandleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHandle(e.target.value);
    },
    [setHandle]
  );

  return (
    <>
      <LoginLoader isActive={isLoading} />
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="my-3 text-xs flex justify-between">
            <p>핸들</p>
          </div>
          <Input
            placeholder="당신의 아이디는 무엇인가요?"
            onChange={onHandleChange}
            value={handle}
            type="text"
          />
          {error && <p className="text-destructive text-xs mt-2">{error}</p>}
        </div>
        <Button
          className="w-full mt-5 cursor-pointer"
          type="submit"
          onClick={handleSubmit}
          disabled={handle === "" || isLoading}
        >
          다음으로
        </Button>
      </div>
    </>
  );
}

export default memo(RegisterFormHandle);
