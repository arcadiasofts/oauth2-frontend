import Link from "next/link";

const footerLinks = [
  { title: "개인정보처리방침", href: "https://docs.arcadiasofts.com/" },
  { title: "이용 약관", href: "https://docs.arcadiasofts.com/" },
  { title: "고객센터", href: "https://support.arcadiasofts.com/" },
];

export function SidebarFooter() {
  return (
    <div className="absolute bottom-5 left-5 text-xs flex flex-col gap-5">
      <div className="flex gap-3">
        {footerLinks.map((link) => (
          <Link key={link.title} href={link.href}>
            {link.title}
          </Link>
        ))}
      </div>
      <p>
        Copyright © <Link href={"https://arcadiasofts.com/"}>Arcadiasofts</Link>{" "}
        2025 - Current.
      </p>
    </div>
  );
}
