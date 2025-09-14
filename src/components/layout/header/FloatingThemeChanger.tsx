import { ThemeChanger } from "@/components/core/ui/theme-changer";

export function FloatingThemeChanger() {
  return (
    <div className="z-50 fixed bottom-5 cursor-pointer right-5 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 w-10 h-10 rounded-md flex items-center justify-center">
      <ThemeChanger />
    </div>
  );
}
