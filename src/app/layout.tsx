import localFont from "next/font/local";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/core/ui/theme-provider";

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
