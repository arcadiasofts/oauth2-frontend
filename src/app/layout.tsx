import localFont from "next/font/local";
import "@/styles/globals.css";
import { ThemeProvider } from "@/shared/ui/theme-provider";
import { TransitionProvider } from "@/shared/ui/transition";
import { ProgressBar } from "@/shared/layout/progress-bar";
import ColorProvider from "@/shared/providers/color-provider";
import { Suspense } from "react";
import UserProvider from "@/shared/providers/user-provider";

const pretendard = localFont({
  variable: "--pretendard",
  src: "../font/PretendardVariable.woff2",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR" suppressHydrationWarning>
      <body className={`${pretendard.className} antialiased`}>
        <ThemeProvider
          defaultTheme="system"
          attribute={"class"}
          enableSystem
          disableTransitionOnChange
        >
          <TransitionProvider>
            <ProgressBar />
            <ColorProvider />
            <UserProvider />
            {children}
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
