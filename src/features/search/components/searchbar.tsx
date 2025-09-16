"use client";
import { Kbd, KbdKey } from "@/shared/ui/kibo-ui/kbd";
import { useSearchBar } from "@/features/search/store";

export default function HomeSearchbar() {
  const { setIsOpen } = useSearchBar();
  return (
    <div
      className="bg-foreground/4 rounded-md flex items-center gap-5 p-1 pl-2 pr-1 border cursor-pointer justify-between mt-10 lg:mx-70"
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <p className="text-xs text-foreground/40">
        찾고 계신 것이 있나요? 여기에서 검색해 보세요!
      </p>
      <Kbd className="scale-75">
        <KbdKey aria-label="Meta">⌘</KbdKey>
        <KbdKey>K</KbdKey>
      </Kbd>
    </div>
  );
}
