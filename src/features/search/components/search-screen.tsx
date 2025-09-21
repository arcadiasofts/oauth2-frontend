import { useSearchBar } from "@/features/search/search-store";
import { Input } from "@/shared/ui/input";
import { useEffect } from "react";

export default function SearchScreen() {
  const { isOpen, setIsOpen } = useSearchBar();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black/60 z-50 flex justify-center items-center transition-opacity"
      style={{
        pointerEvents: isOpen ? "inherit" : "none",
        transitionDuration: isOpen ? "500ms" : "300ms",
        opacity: isOpen ? "100%" : "0%",
      }}
    >
      <div
        className="p-3 w-screen max-w-[600px] mx-5 bg-background border rounded-md h-fit mb-80 z-[60] transition-all"
        style={{
          opacity: isOpen ? "100%" : "0%",
          translate: isOpen ? "0 0" : "0 50px",
          transitionDuration: isOpen ? "500ms" : "300ms",
          transitionTimingFunction: isOpen
            ? "cubic-bezier( 0.03, 0.66, 0.12, 0.95 )"
            : "inherit",
        }}
      >
        <h2 className="font-bold text-sm">페이지 검색</h2>
        <Input className="w-full mt-2" placeholder="검색어를 입력하세요." />
        <div></div>
      </div>
      <div
        className="w-screen h-screen fixed z-[55] top-0 left-0"
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
}
