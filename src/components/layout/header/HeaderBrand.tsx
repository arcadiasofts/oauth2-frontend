import Logo from "@/components/core/brand/logo";

export function HeaderBrand() {
  return (
    <div className="font-bold flex gap-3 items-center text-xl">
      <Logo className="fill-primary w-10" />
      <p className="mb-[-2px]">계정 관리</p>
    </div>
  );
}
