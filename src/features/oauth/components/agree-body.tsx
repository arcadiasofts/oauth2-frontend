"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OauthAgreeForm, OauthAgreeType } from "./agree-form";
import OauthHeader from "./header";
import Logo from "@/shared/brand/logo";
import { api } from "@/lib/api";
import LoginLoader from "@/features/auth/components/login/login-loader";

export default function OauthAgreeBody() {
  const [app, setApp] = useState<{
    title: string;
    profile?: string;
    require_scope: OauthAgreeType[];
    is_arcadia: boolean;
    is_partnership: boolean;
  }>({
    title: "",
    is_arcadia: false,
    require_scope: [],
    is_partnership: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const params = useSearchParams();
  const clientId = params.get("client_id");
  const redirectURI = params.get("redirect_uri");
  const responseType = params.get("response_type");
  const state = params.get("state");
  const nonce = params.get("nonce");
  const router = useRouter();

  useEffect(() => {
    if (!clientId || !redirectURI || !responseType) {
      setError("팔수 파라미터가 누락되었습니다.");
      return;
    }
    if (responseType !== "code") {
      setError("지원하지 않는 형식입니다.");
      return;
    }
    const prepare = async () => {
      try {
        const connectData = await api.get(
          `/oauth/connection?client_id=${clientId}`
        );
        if (connectData.data.found) {
          const redirect = new URL(redirectURI || "");
          redirect.searchParams.append("code", connectData.data.connect_id);
          if (state) redirect.searchParams.append("state", state);
          router.push(redirect.toString());
          return;
        }
        const is_redirect_available = (
          await api.get(
            `/verify/is-oauth-redirect-uri-available?client_id=${clientId}&redirect_uri=${redirectURI}`
          )
        ).data.is_available as boolean;
        if (!is_redirect_available) {
          setError("사용할 수 없는 리다이렉트 URI입니다.");
        }
        const applicationData = (
          await api.get(`/oauth/application/${clientId}`)
        ).data;
        setApp(applicationData);
        setInitializing(false);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setInitializing(false);
      }
    };
    prepare();
  }, [clientId, redirectURI, responseType, state, nonce]);

  const handleSubmit = async (agreed: number[]) => {
    setLoading(true);
    try {
      const res = await api.post("/oauth/authorize", {
        client_id: clientId,
        response_type: "code",
        agreed,
      });
      const redirect = new URL(redirectURI || "");
      redirect.searchParams.append("code", res.data.code);
      if (state) redirect.searchParams.append("state", state);
      router.push(redirect.toString());
    } catch (error: any) {
      setError(
        `에러가 발생하였습니다. 에러 코드 : ${error.response.data.message}`
      );
      const redirect = new URL(redirectURI || "");
      redirect.searchParams.append("error", error.response.data.message);
      redirect.searchParams.append(
        "error_message",
        "인증 중 문제가 발생하였습니다."
      );
      router.push(redirect.toString());
    }
  };

  if (initializing)
    return (
      <div>
        <div className="absolute top-0 left-0 h-full animate-pulse bg-foreground/5 flex-col gap-10 items-start justify-between w-full"></div>
        <div className="h-48"></div>
      </div>
    );

  if (error !== "")
    return (
      <div className="flex flex-col gap-10 items-start justify-between w-full">
        <div>
          <h1 className="text-xl font-bold">요청을 처리할 수 없습니다.</h1>
          <p className="text-sm text-foreground/70 mt-4">
            {error} <br />
            에러가 지속적으로 발생한다면, 관리자에게 문의해 주세요.
          </p>
        </div>
        <div className="flex gap-2 ml-auto pr-1">
          <Logo className="w-10 fill-primary" />
          <p>Arcadiasofts LTD.</p>
        </div>
      </div>
    );

  return (
    <>
      {isLoading ? <LoginLoader /> : <></>}
      <OauthHeader title={app.title} is_arcadia={app.is_arcadia} />
      <div
        className="flex-1 transition-all duration-300"
        style={{
          opacity: isLoading ? "0%" : "100%",
          pointerEvents: isLoading ? "none" : "inherit",
        }}
      >
        <OauthAgreeForm
          toAgree={app.require_scope}
          onSubmit={(e) => {
            handleSubmit(e.agreed);
          }}
          redirectTo={redirectURI ?? "/"}
        />
      </div>
    </>
  );
}
