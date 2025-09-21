"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import HeaderSearchbar from "./searchbar";

export function UserNav() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex gap-5 items-center">
      <HeaderSearchbar />
      {isClient ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer flex gap-3 items-center">
              <Avatar>
                <AvatarImage
                  src={
                    "https://k.kakaocdn.net/dn/dcdixK/btsMAHGSopq/tei7YS5Qa1VpD5U2eNiRb1/img_640x640.jpg"
                  }
                />
                <AvatarFallback>규</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-3" align="end">
            <DropdownMenuLabel className="text-xs">My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="w-12 h-12" /> // Placeholder for server render
      )}
    </div>
  );
}