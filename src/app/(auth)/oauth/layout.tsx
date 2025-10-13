import { RequireLogin } from "@/shared/providers/user-provider";
import { ThemeChanger } from "@/shared/ui/theme-changer";

export default function OAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RequireLogin />
      {children}
    </>
  );
}
