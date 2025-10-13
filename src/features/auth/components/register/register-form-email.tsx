"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import LoginLoader from "../login/login-loader";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { api } from "@/lib/api";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/ui/input-otp";
import Link from "next/link";
import { errors } from "@/const/errors";

const TOTAL_SECONDS = 180;

// --- Custom Hook for Verification Logic ---

type UseEmailVerificationProps = {
  setEmail: Dispatch<SetStateAction<string>>;
  toNext: () => void;
};

const useEmailVerification = ({
  setEmail,
  toNext,
}: UseEmailVerificationProps) => {
  const [tempEmail, setTempEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [verifyNumb, setVerifyNumb] = useState("");
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!isTimerRunning || seconds <= 0) {
      setTimerRunning(false);
      return;
    }
    const intervalId = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(intervalId);
  }, [isTimerRunning, seconds]);

  const createVerifyRequest = useCallback(async () => {
    setError("");
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(tempEmail)) {
      setError("올바른 이메일 형식이 아닌 것 같습니다.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/cert/create/email", {
        email: tempEmail,
        for: "register",
      });
      if (!res.data.is_available) {
        setError("누군가 사용 중인 이메일입니다.");
        return;
      }
      setSeconds(TOTAL_SECONDS);
      setTimerRunning(true);
      setEmailSent(true);
      setVerified(false);
      setVerifyNumb("");
    } catch (err: any) {
      setError(err.message || "인증 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [tempEmail]);

  const handleVerify = useCallback(async () => {
    if (verifyNumb.length !== 6) {
      setError("인증 번호를 올바르게 입력해 주세요.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/cert/verify/email", {
        email: tempEmail,
        value: verifyNumb,
        for: "register",
      });
      if (!res.data.verified) {
        setError("인증 정보가 올바르지 않습니다.");
        return;
      }
      setVerified(true);
      setTimerRunning(false);
      setEmail(tempEmail);
      toNext();
    } catch (err: any) {
      console.log(err);
      if (err.response.data.message === errors.INVALID_CERTIFICATION) {
        setError("인증번호가 올바르지 않습니다");
        return;
      }
      if (err.response.data.message === errors.TIMEOUT) {
        setError("인증 기간이 만료되었습니다. 재전송 이후 다시 시도해주세요.");
        return;
      }
      setError(err.message || "인증 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [verifyNumb, tempEmail, setEmail, toNext]);

  const timer = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`;

  return {
    tempEmail,
    setTempEmail,
    isLoading,
    isTimerRunning,
    verifyNumb,
    setVerifyNumb,
    error,
    emailSent,
    verified,
    timer,
    createVerifyRequest,
    handleVerify,
  };
};

// --- UI Sub-components ---

type EmailInputGroupProps = {
  email: string;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRequest: () => void;
  isSent: boolean;
  isLoading: boolean;
  isTimerRunning: boolean;
  timer: string;
};

const EmailInputGroup = memo(
  ({
    email,
    onEmailChange,
    onRequest,
    isSent,
    isLoading,
    isTimerRunning,
    timer,
  }: EmailInputGroupProps) => (
    <div>
      <div
        className="my-3 text-xs flex justify-between"
        style={{ opacity: isSent ? "40%" : "inherit" }}
      >
        <p>이메일</p>
      </div>
      <div className="flex justify-between gap-2">
        <Input
          placeholder="당신의 이메일은 무엇인가요?"
          onChange={onEmailChange}
          value={email}
          type="email"
          disabled={isSent}
        />
        <Button
          className="cursor-pointer w-20"
          style={{ color: isTimerRunning ? "var(--destructive)" : "inherit" }}
          onClick={onRequest}
          variant={"outline"}
          disabled={isLoading || isTimerRunning || email === ""}
        >
          {isSent ? (isTimerRunning ? timer : "재전송") : "인증하기"}
        </Button>
      </div>
    </div>
  )
);
EmailInputGroup.displayName = "EmailInputGroup";

type VerificationInputGroupProps = {
  isSent: boolean;
  code: string;
  onCodeChange: (value: string) => void;
  isVerified: boolean;
};

const VerificationInputGroup = memo(
  ({ isSent, code, onCodeChange, isVerified }: VerificationInputGroupProps) => {
    const verifyRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
      if (verifyRef.current) {
        setHeight(verifyRef.current.offsetHeight);
      }
    }, []);

    return (
      <div
        className="overflow-hidden transition-all ease-in-out duration-500"
        style={{ height: isSent ? `${height}px` : 0 }}
      >
        <div className="py-1" ref={verifyRef}>
          <div className="text-xs flex justify-between mt-3">
            <p className="text-foreground/60">이메일이 전송되었습니다.</p>
            <Link
              href={"/help/could-not-recieve-email"}
              className="text-primary hover:text-primary/60 transition-colors cursor-pointer"
            >
              이메일이 오지 않아요
            </Link>
          </div>
          <div className="mt-5 mb-3 text-xs flex justify-between">
            <p>인증번호를 입력해 주세요.</p>
          </div>
          <div className="px-1">
            <InputOTP
              maxLength={6}
              onChange={onCodeChange}
              value={code}
              disabled={isVerified || !isSent}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator className="text-border" />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      </div>
    );
  }
);
VerificationInputGroup.displayName = "VerificationInputGroup";

// --- Main Component ---

type RegisterFormEmailProps = {
  setEmail: Dispatch<SetStateAction<string>>;
  toNext: () => void;
};

function RegisterFormEmail({ setEmail, toNext }: RegisterFormEmailProps) {
  const {
    tempEmail,
    setTempEmail,
    isLoading,
    isTimerRunning,
    verifyNumb,
    setVerifyNumb,
    error,
    emailSent,
    verified,
    timer,
    createVerifyRequest,
    handleVerify,
  } = useEmailVerification({ setEmail, toNext });

  const onEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setTempEmail(e.target.value),
    [setTempEmail]
  );

  return (
    <>
      <LoginLoader isActive={isLoading} />
      <div className="flex flex-col h-full justify-between">
        <div>
          <EmailInputGroup
            email={tempEmail}
            onEmailChange={onEmailChange}
            onRequest={createVerifyRequest}
            isSent={emailSent}
            isLoading={isLoading}
            isTimerRunning={isTimerRunning}
            timer={timer}
          />
          <VerificationInputGroup
            isSent={emailSent}
            code={verifyNumb}
            onCodeChange={setVerifyNumb}
            isVerified={verified}
          />
        </div>
        {error && <p className="text-destructive text-xs mt-2">{error}</p>}
        <Button
          className="w-full mt-5 cursor-pointer"
          type="submit"
          onClick={handleVerify}
          disabled={isLoading || verified || verifyNumb.length !== 6}
        >
          다음으로
        </Button>
      </div>
    </>
  );
}

export default memo(RegisterFormEmail);
