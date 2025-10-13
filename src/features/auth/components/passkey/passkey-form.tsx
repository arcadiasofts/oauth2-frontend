"use client";
import { useState } from "react";
import PasskeyGetPassword from "./passkey-ask-password";
import PasskeyRegister from "./passkey-register";
import { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/browser";

export default function PasskeyForm() {
  const [index, setIndex] = useState(0);
  return (
    <>
      {index === 0 && (
        <PasskeyGetPassword
          onSubmit={(e) => {
            setIndex(index + 1);
          }}
        />
      )}
      {index === 1 && <PasskeyRegister />}
    </>
  );
}
