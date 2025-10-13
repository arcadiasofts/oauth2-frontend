import RegisterForm from "@/features/auth/components/register/register-form";
import RegisterHeader from "@/features/auth/components/register/register-header";
import { DoNotLogin } from "@/shared/providers/user-provider";

export default function RegisterPage() {
  return (
    <>
      <DoNotLogin />
      <RegisterHeader />
      <RegisterForm />
    </>
  );
}
