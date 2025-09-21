import Logo from "@/shared/brand/logo";
import Link from "next/link";

export function HeaderBrand() {
  return (
    <Link href={"/"} className="font-light flex gap-3 items-center text-xl">
      <Logo className="fill-primary w-10" />
      <p className="mb-[-2px]">계정 관리</p>
    </Link>
  );
}
