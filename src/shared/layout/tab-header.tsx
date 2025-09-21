"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import ColorProvider from "../providers/color-provider";
import { FloatingThemeChanger } from "./header/FloatingThemeChanger";
import Logo from "../brand/logo";
import HeaderSearchbar from "./header/searchbar";
import { TransitionLink } from "../ui/transition";

export default function TabHeader() {
  const [origin, setOrigin] = useState("");
  const [previous, setPrevious] = useState("");
  const header = useRef<HTMLDivElement>(null);
  const altHeader = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setPrevious(sessionStorage.getItem("referrer") || "");
    setOrigin(window.location.origin);
  }, []);
  useEffect(() => {
    if (!altHeader.current || !header.current) return;
    altHeader.current.style.height = `${header.current.offsetHeight}px`;
  }, [altHeader, header]);
  return (
    <>
      <ColorProvider />
      <FloatingThemeChanger />
      <header
        className="fixed bg-background top-0 w-full h-fit flex justify-center border-b-border border-b"
        ref={header}
        id="application-header"
      >
        <div className="p-6 flex items-center w-full justify-between max-w-[1200px]">
          <div className="flex uppercase items-center font-light text-xl gap-8">
            {previous.startsWith(origin) ? (
              <TransitionLink
                className="text-foreground/40"
                href={previous.replace(origin, "")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </TransitionLink>
            ) : (
              <></>
            )}
            <TransitionLink href={"/"} className="flex items-center gap-3">
              <Logo className="fill-primary w-12" />
              <h1>계정 관리</h1>
            </TransitionLink>
          </div>
          <div className="">
            <HeaderSearchbar />
          </div>
        </div>
      </header>
      <div ref={altHeader}></div>
    </>
  );
}
