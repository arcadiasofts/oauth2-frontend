"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import gsap from "gsap";
import Logo from "@/shared/brand/logo";

interface TransitionContextType {
  playTransition: (href: string) => void;
}
const TransitionContext = createContext<TransitionContextType | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const screenRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);

  const playTransition = (href: string) => {
    const screen = screenRef.current;
    if (screen) {
      const tl = gsap.timeline({ onComplete: () => router.push(href) });
      tl.to(screen, { autoAlpha: 1, duration: 0.5, ease: "power2.inOut" });
      tl.to(logoRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, "-=0.4");
    }
  };

  useEffect(() => {
    const screen = screenRef.current;
    // Ensure the screen is fully visible before fading out
    if (screen && gsap.getProperty(screen, "autoAlpha") === 1) {
      const tl = gsap.timeline();
      tl.to(logoRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.in" });
      tl.to(screen, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.2");
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ playTransition }}>
      {children}
      <div
        ref={screenRef}
        className="fixed inset-0 z-[100] bg-primary pointer-events-none opacity-0 flex items-center justify-center"
      >
        <Logo ref={logoRef} className="w-24 h-auto text-white opacity-0" fill="white" />
      </div>
    </TransitionContext.Provider>
  );
}

export function TransitionLink(
  props: LinkProps & { children: React.ReactNode; className?: string }
) {
  const context = useContext(TransitionContext);
  if (!context) return <Link {...props} />;

  const { playTransition } = context;
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (props.href === window.location.pathname) return;
    sessionStorage.setItem("referrer", window.location.href);
    playTransition(props.href.toString());
  };

  return <Link {...props} onClick={handleClick} />;
}
