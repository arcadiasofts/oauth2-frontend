import { josa } from "es-hangul";
import Logo from "@/shared/brand/logo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
export default function OauthHeader({
  title,
  is_arcadia,
}: {
  title: string;
  is_arcadia?: boolean;
}) {
  return (
    <div className="md:flex-1 md:px-5 pt-5 pb-1 md:pb-5 flex flex-col justify-between">
      <div>
        <Logo id="arcadia-logo" className="fill-primary w-14 mb-5" />
        <h1 className="font-bold text-xl">아르카디아 계정으로 로그인</h1>
        <div className="text-sm font-bold py-1 flex items-center">
          {
            <span className="text-primary flex items-center">
              {title}
              {is_arcadia ? (
                <Tooltip>
                  <TooltipTrigger>
                    <svg
                      className="w-3 fill-primary mx-[3px]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 770.42 770.42"
                    >
                      <path d="M385.21,0C172.46,0,0,172.46,0,385.21s172.46,385.21,385.21,385.21,385.21-172.46,385.21-385.21S597.96,0,385.21,0ZM290.14,527.34l-22.27-29.48-92.5-108.65,51.48-43.83,75.15,88.27,252.3-190.57,40.75,53.95-304.91,230.3Z" />
                    </svg>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>인증된 서비스</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <></>
              )}
            </span>
          }
          <p>{josa(title, "으로/로").replace(title, "")} 계속합니다.</p>
        </div>
      </div>
      {is_arcadia ? (
        <p className="text-xs mt-3 mb-3 md:mb-0 md:mt-10 text-foreground/40 break-keep">
          아르카디아는 {title}의 서비스 제공자이며, 아르카디아 계정의 로그인 /
          회원가입 기능을 공유합니다. 개인정보처리방침, 서비스 이용 약관 등은{" "}
          {title} 서비스 내에서 안내드린 바와 동일하며, 동의하신 이후엔 해당
          사항에 의거해 정보가 관리됩니다.
        </p>
      ) : (
        <p className="text-xs mt-3 mb-3 md:mb-0 md:mt-10 text-foreground/40 break-keep">
          아르카디아는 단순 로그인 / 회원가입 서비스의 제공자이며 {title}의
          서비스 제공자가 아닙니다. 동의 후 전달된 개인정보 및 이용약관에 대한
          의무와 책임은 {title}에 있습니다. 동의 이후엔 {title}의 이용약관 및
          개인정보처리방침에 따라 정보가 관리됩니다.
        </p>
      )}
    </div>
  );
}
