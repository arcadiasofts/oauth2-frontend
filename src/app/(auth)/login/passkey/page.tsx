import PasskeyLoginform from "@/features/auth/components/passkey-login/passkey-login-form";
import PasskeyLoginHeader from "@/features/auth/components/passkey-login/passkey-login-header";
import { DoNotLogin } from "@/shared/providers/user-provider";

export default function PasskeyLoginPage() {
  return (
    <>
      <DoNotLogin />
      <PasskeyLoginHeader />
      <PasskeyLoginform />
    </>
  );
}
