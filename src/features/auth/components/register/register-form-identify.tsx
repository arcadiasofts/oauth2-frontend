"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import LoginLoader from "../login/login-loader";
import { useState, useCallback, memo, useEffect } from "react";
import * as Portone from "@portone/browser-sdk/v2";
import { api } from "@/lib/api";

type RegisterFormPasswordProps = {
  setIdentityVerificationId: (e: string) => void;
  toNext: () => void;
  toPrevious: () => void;
};

function RegisterFormPassword({
  setIdentityVerificationId,
  toNext,
  toPrevious,
}: RegisterFormPasswordProps) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    const identityVerificationId = `i-${crypto.randomUUID()}`;
    try {
      const response = await Portone.requestIdentityVerification({
        storeId: "store-eeb72cfb-0836-4955-8e12-38fa14ee8930",
        channelKey: "channel-key-0995696e-b2d1-4d57-b943-11d7faa98af5",
        windowType: {
          pc: "POPUP",
          mobile: "REDIRECTION",
        },
        customer: {
          fullName: "이규연",
          phoneNumber: "01040551202",
          email: "gyeon@arcadiasofts.com",
        },
        bypass: {
          kcpV2: {
            web_siteid: "account.arcadiasofts.com",
          },
        },
        identityVerificationId,
      });
      if (response?.code !== undefined) {
        setLoading(false);
        setError(response.message || "알 수 없는 에러 발생");
        return;
      }
      setIdentityVerificationId(identityVerificationId);
      toNext();
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleToPrevious = useCallback(async () => {
    toPrevious();
  }, [toPrevious]);

  return (
    <>
      <div className="flex-1 h-full flex flex-col justify-between">
        <div>
          <div className="my-3 font-bold flex justify-between">
            <p>본인 확인을 진행합니다.</p>
          </div>
          <div className="my-3 text-xs flex justify-between">
            <p>신원 정보 확인을 진행합니다. 팝업창을 허용해 주세요.</p>
          </div>
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
          >
            본인 인증하기
          </Button>
        </div>
      </div>
    </>
  );
}

export default memo(RegisterFormPassword);
