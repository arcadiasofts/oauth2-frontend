import { Suspense } from "react";
import ColorProvider from "@/shared/providers/color-provider";
import { ThemeChanger } from "@/shared/ui/theme-changer";
import LoginHeader from "@/features/auth/components/login/LoginHeader";
import LoginForm from "@/features/auth/components/login/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="absolute right-10 top-10">
        <ThemeChanger />
      </div>
      <Suspense fallback={null}>
        <ColorProvider />
      </Suspense>
      <div className="border p-5 rounded-md w-[90vw] max-w-[800px] flex flex-col md:flex-row">
        <LoginHeader />
        <LoginForm />
      </div>
    </main>
  );
}
