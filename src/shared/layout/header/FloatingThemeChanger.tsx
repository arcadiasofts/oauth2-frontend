import { ThemeChanger } from "@/shared/ui/theme-changer";

export function FloatingThemeChanger() {
  return (
    <div className="z-50 fixed bottom-5 cursor-pointer right-5 flex items-center justify-center">
      <ThemeChanger />
    </div>
  );
}
