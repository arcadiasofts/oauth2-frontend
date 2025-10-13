import { Suspense } from "react";
import ColorProvider from "@/shared/providers/color-provider";
import { ThemeChanger } from "@/shared/ui/theme-changer";
import LoginHeader from "@/features/auth/components/login/login-header";
import LoginForm from "@/features/auth/components/login/login-form";
import { Metadata } from "next";
import { DoNotLogin } from "@/shared/providers/user-provider";

export const metadata: Metadata = {
  title: "로그인 - 아르카디아 계정 관리",
};

export default function LoginPage() {
  return (
    <>
      <DoNotLogin />
      <LoginHeader />
      <LoginForm />
    </>
  );
}
