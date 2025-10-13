import { ThemeChanger } from "@/shared/ui/theme-changer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-center mt-20 md:mt-0 md:items-center md:h-screen">
      <div className="fixed right-10 top-10">
        <ThemeChanger />
      </div>
      <div className="md:border md:relative md:p-5 rounded-md w-[90vw] max-w-[800px] flex flex-col md:flex-row md:overflow-hidden h-fit">
        {children}
      </div>
    </main>
  );
}
