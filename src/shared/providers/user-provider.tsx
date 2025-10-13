"use client";

import { api } from "@/lib/api";
import { useUserStore } from "@/store/auth/user.store";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function UserProvider() {
  const { setUser, completeLoading } = useUserStore();
  useEffect(() => {
    const prepare = async () => {
      try {
        const res = await api.get("/auth/get-session-info");
        const user: UserType = res.data;
        setUser(user);
      } catch (e) {
        console.log("Could not find session info.");
      }
      completeLoading();
    };
    prepare();
  }, []);
  return <></>;
}

export function RequireLogin() {
  const { isLoading, isLoggedIn } = useUserStore();
  const router = useRouter();
  const param = useSearchParams();
  const redirect_to = param.get("redirect_to");
  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) {
      const uri = encodeURIComponent(
        redirect_to ? redirect_to : window.location.href
      );
      console.log(`Redirecting to /login?redirect-to=${uri}...`);
      router.push(`/login?redirect_to=${uri}`);
    }
  }, [isLoading, isLoggedIn, router]);
  return <></>;
}

export function DoNotLogin() {
  const { isLoading, isLoggedIn } = useUserStore();
  const router = useRouter();
  const param = useSearchParams();
  const redirect_to = param.get("redirect_to");
  useEffect(() => {
    if (isLoading) return;
    if (isLoggedIn) {
      const uri = redirect_to
        ? redirect_to
        : new URL(window.location.href).origin;
      console.log(`Redirecting to ${uri}...`);
      window.location.href = uri;
    }
  }, [isLoading, isLoggedIn, router]);
  return <></>;
}
