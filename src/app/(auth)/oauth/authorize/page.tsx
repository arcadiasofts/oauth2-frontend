import { Metadata } from "next";
import OauthAgreeBody from "@/features/oauth/components/agree-body";

export const metadata: Metadata = {
  title: "아르카디아 계정으로 로그인",
};

export default function AuthorizePage() {
  return (
    <>
      <OauthAgreeBody />
    </>
  );
}
