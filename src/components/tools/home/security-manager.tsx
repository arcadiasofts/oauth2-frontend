import Link from "next/link";

const icon = {
  check: (
    <svg
      data-name="shield_success"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 655.77 773.24"
      className="w-14 fill-green-500 z-10 relative"
    >
      <path d="M632.08,121.13c-31.18,3.2-93.65,5.42-164.79-22.54C394.13,69.85,349.19,23.88,328.71,0c-16.73,22.34-57.7,70.76-129.03,100-79.01,32.39-148.98,22.27-176.06,16.9-10.51,34.43-67.76,233.7,46.48,430.99,84.2,145.4,213.31,206.41,258.61,225.35,45.06-18.7,173.11-78.81,256.89-222.54,114.49-196.4,56.92-395.57,46.48-429.58ZM309.54,526.76l-156.34-122.54,45.07-56.34,101.41,84.51,170.42-166.2,50,50-210.56,210.56Z" />
    </svg>
  ),
  warn: (
    <svg
      data-name="shield-warn"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 655.77 773.24"
      className="w-14 fill-destructive z-10 relative"
    >
      <path d="M632.08,121.13c-31.18,3.2-93.65,5.42-164.79-22.54C394.13,69.85,349.19,23.88,328.71,0c-16.73,22.34-57.7,70.76-129.03,100-79.01,32.39-148.98,22.27-176.06,16.9-10.51,34.43-67.76,233.7,46.48,430.99,84.2,145.4,213.31,206.41,258.61,225.35,45.06-18.7,173.11-78.81,256.89-222.54,114.49-196.4,56.92-395.57,46.48-429.58ZM411.49,509.07l-82.18-82.18-81.2,81.2-48.13-48.13,80.86-80.86-84.04-84.04,47.78-47.78,83.78,83.78,82.45-82.45,24.99,24.99,22.89,22.89-79.94,81.61,81.86,81.86-49.12,49.12Z" />
    </svg>
  ),
};

export default function SecurityManager() {
  return (
    <div className="border rounded-md w-full flex-1 p-4 h-full">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            <span className="text-destructive">{3}</span>개의 보안 문제를
            찾았습니다.
          </h3>
          <p className="text-sm mt-4">
            계정과 관련된 보안 문제가 있습니다.
            <br />
            보안 문제를 확인하고 보완하세요
          </p>
        </div>
        <div>
          <div className="bg-foreground/5 rounded-full flex items-center justify-center w-20 h-20 relative">
            {icon.warn}
            <div className="w-9 h-9 z-0 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-border my-4"></div>
      <Link href={"/"} className="text-primary font-bold">
        더 알아보기
      </Link>
    </div>
  );
}
