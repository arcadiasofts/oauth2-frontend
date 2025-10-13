import PasskeyForm from "@/features/auth/components/passkey/passkey-form";
import PasskeyHeader from "@/features/auth/components/passkey/passkey-header";
import { RequireLogin } from "@/shared/providers/user-provider";

export default function PasskeyRegisterPage() {
  return (
    <>
      <RequireLogin />
      <PasskeyHeader />
      <PasskeyForm />
    </>
  );
}
