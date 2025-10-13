"use client";

import { useEffect, useState } from "react";

export default function LoginLoader({
  isActive = true,
}: {
  isActive?: boolean;
}) {
  const [position, setPosition] = useState(100);
  const speed = 800;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (position === -100) {
        setPosition(100);
      } else {
        setPosition(-100);
      }
    }, speed);
    return () => clearInterval(intervalId);
  }, [position]);

  const transitionStyle = position === 100 ? `left ${speed}ms linear` : "none";
  const secondTransitionStyle =
    position === -100 ? `left ${speed}ms linear` : "none";

  return (
    <div
      className="absolute left-0 top-0 w-full h-1 bg-primary/20 overflow-hidden"
      style={{
        opacity: isActive ? "100%" : "0%",
      }}
    >
      <div
        className="bg-primary h-full w-[60%] absolute top-0"
        style={{
          left: `${position}%`,
          transition: transitionStyle,
        }}
      ></div>{" "}
      <div
        className="bg-primary h-full w-[60%] absolute top-0"
        style={{
          left: `${-position}%`,
          transition: secondTransitionStyle,
        }}
      ></div>
    </div>
  );
}
