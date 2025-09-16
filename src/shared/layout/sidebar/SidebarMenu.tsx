"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { SidebarLink } from "./SidebarLink";

const sidebarItems: { title: string; href: string; icon: React.ReactNode }[] = [
  {
    title: "홈",
    href: "/",
    icon: (
      <svg
        id="sidebar-home"
        data-name="sidebar-item"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 643.38 664.51"
        className="fill-none  stroke-[80px] size-4"
        style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
      >
        <g opacity={0.4}>
          <polygon points="603.38 624.51 40 624.51 40 297.75 321.69 40 603.38 297.75 603.38 624.51" />
          <line x1="168.87" y1="510.42" x2="474.51" y2="510.42" />
        </g>
      </svg>
    ),
  },
  {
    title: "프로필",
    href: "/profile",
    icon: (
      <svg
        id="sidebar-home"
        data-name="sidebar-item"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 891.27 891.27"
        className="fill-none stroke-[80px] size-4"
        style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
      >
        <g opacity={0.4}>
          <circle cx="445.63" cy="445.63" r="405.63" />
          <circle cx="445.63" cy="358.05" r="134.51" />
          <path d="M155.64,729.25s113.67-109.98,290-109.98,290,109.98,290,109.98" />
        </g>
      </svg>
    ),
  },
  {
    title: "개인정보",
    href: "/privacy",
    icon: (
      <svg
        id="sidebar-home"
        data-name="sidebar-item"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 617.9 699.97"
        className="fill-none stroke-[80px] size-4"
        style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
      >
        <g opacity={0.4}>
          <circle cx="435.08" cy="182.82" r="142.82" />
          <line x1="339.87" y1="289.28" x2="40" y2="589.15" />
          <line x1="173.02" y1="659.97" x2="88.83" y2="575.77" />
          <line x1="159.71" y1="504.9" x2="214.07" y2="559.26" />
          <line x1="232.31" y1="434.02" x2="318.78" y2="520.49" />
        </g>
      </svg>
    ),
  },
  {
    title: "연결된 서비스",
    href: "/linked",
    icon: (
      <svg
        id="sidebar-home"
        data-name="sidebar-item"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 536.79 663.23"
        className="fill-none stroke-[80px] size-4"
        style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
      >
        <g opacity={0.4}>
          <path d="M252.43,419.2l210.33-189.49s75.34-67.88,1.81-149.5c-73.53-81.62-148.87-13.75-148.87-13.75L105.37,255.96" />
          <path d="M282.22,242.97l-208.8,191.18s-74.79,68.48-.6,149.51c74.19,81.03,148.98,12.54,148.98,12.54l208.8-191.18" />
        </g>
      </svg>
    ),
  },
  {
    title: "결제 정보",
    href: "/purchase",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        className="size-4 fill-foreground opacity-40"
      >
        <path d="M160-240v-320 13-173 480Zm556 100L576-280q-13-13-18.5-28t-5.5-30q0-32 23-57t59-25q28 0 44 13t38 35q20-20 36.5-34t45.5-14q37 0 59.5 25.5T880-337q0 15-6 30t-18 27L716-140ZM160-640h640v-80H160v80Zm303 480H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v213q-35-25-76.5-39T716-560q-57 0-107.5 21.5T520-480H160v240h279q3 21 9 41t15 39Z" />
      </svg>
    ),
  },
];

export function SidebarMenu() {
  const pathname = usePathname();
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeLink = document.querySelector(".active-link");
    if (activeLink && indicatorRef.current) {
      const { offsetTop, offsetHeight } = activeLink as HTMLElement;
      indicatorRef.current.style.top = `${offsetTop}px`;
      indicatorRef.current.style.height = `${offsetHeight}px`;
    }
  }, [pathname]);

  return (
    <div className="mt-5 relative w-auto min-w-[250px]">
      <div
        ref={indicatorRef}
        className="absolute left-0 w-1 bg-primary transition-all duration-300"
      />
      {sidebarItems.map((item, i) => (
        <SidebarLink href={item.href} key={i} isActive={pathname === item.href}>
          <div className="stroke-foreground">{item.icon}</div>
          {item.title}
        </SidebarLink>
      ))}
    </div>
  );
}
