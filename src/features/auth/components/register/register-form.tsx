"use client";
import { useState, useCallback } from "react";
import RegisterFormHandle from "./register-form-handle";
import RegisterFormEmail from "./register-form-email";
import RegisterFormNickname from "./register-form-nickname";
import RegisterFormPassword from "./register-form-password";
import RegisterFormExtra from "./register-form-extra";
import RegisterFormComplete from "./register-form-complete";

export default function RegisterForm() {
  const [index, setIndex] = useState(0);
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const toNext = useCallback(() => {
    setIndex((prevIndex) => prevIndex + 1);
  }, []);

  const toPrevious = useCallback(() => {
    setIndex((prevIndex) => prevIndex - 1);
  }, []);

  return (
    <div className="md:flex-1 px-5 pt-3 pb-1 md:pt-5 md:min-h-72 flex flex-col justify-between transition-all ease-in-out duration-300">
      <div className="h-full">
        {index === 0 && (
          <RegisterFormEmail setEmail={setEmail} toNext={toNext} />
        )}
        {index === 1 && (
          <RegisterFormHandle
            handle={handle}
            setHandle={setHandle}
            toNext={toNext}
          />
        )}
        {index === 2 && (
          <RegisterFormNickname
            nickname={nickname}
            setNickname={setNickname}
            toNext={toNext}
            toPrevious={toPrevious}
          />
        )}
        {index === 3 && (
          <RegisterFormPassword
            password={password}
            setPassword={setPassword}
            toNext={toNext}
            toPrevious={toPrevious}
          />
        )}
        {index === 4 && (
          <RegisterFormExtra
            email={email}
            handle={handle}
            nickname={nickname}
            password={password}
            toPrevious={toPrevious}
            toNext={toNext}
          />
        )}
        {index === 5 && <RegisterFormComplete nickname={nickname} />}
      </div>
      <a
        href="/login"
        className="mt-5 font-bold text-xs text-end my-3 block text-black/30 dark:text-white/30 underline"
      >
        이미 계정이 있으신가요?
      </a>
    </div>
  );
}
