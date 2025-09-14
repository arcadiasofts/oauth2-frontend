import ColorProvider from "@/components/core/util/color-provider";
import { ThemeChanger } from "@/components/core/ui/theme-changer";
import LoginHeader from "@/components/auth/login/LoginHeader";
import LoginForm from "@/components/auth/login/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="absolute right-10 top-10">
        <ThemeChanger />
      </div>
      <ColorProvider />
      <div className="border p-5 rounded-md w-[90vw] max-w-[800px] flex flex-col md:flex-row">
        <LoginHeader />
        <LoginForm />
      </div>
    </main>
  );
}
