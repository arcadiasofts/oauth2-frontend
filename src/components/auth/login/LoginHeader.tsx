import Logo from "@/components/core/brand/logo";

export default function LoginHeader() {
  return (
    <div className="md:flex-1 px-5 pt-5 pb-1 md:pb-5">
      <Logo id="arcadia-logo" className="fill-primary w-14 mb-5" />
      <h1 className="font-bold text-xl">아르카디아 계정으로 로그인</h1>
      <p className="text-sm font-bold py-1">
        {<span className="text-primary">{"아르카디아"}</span>}로 계속합니다.
      </p>
    </div>
  );
}
