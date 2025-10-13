"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import React, { useEffect, useState } from "react";
import HeaderSearchbar from "./searchbar";
import { useUserStore } from "@/store/auth/user.store";

export function UserNav() {
  const [isClient, setIsClient] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex gap-5 items-center">
      <HeaderSearchbar />
      {isClient ? (
        <Avatar>
          <AvatarImage src={user.profile["64"] ?? "none"} />
          <AvatarFallback>{user.nickname[0]}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-12 h-12" /> // Placeholder for server render
      )}
    </div>
  );
}
