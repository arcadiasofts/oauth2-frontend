import { Container, ContainerItem } from "@/shared/layout/item-containers";

export default function AccountSecurityInfo() {
  return (
    <Container title="보안 정보">
      <ContainerItem href="/security/reset/passowrd">
        <div className="py-5 w-full flex justify-between items-center">
          <p className="font-bold">비밀번호</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </ContainerItem>
      <ContainerItem href="/security/passkey">
        <div className="py-5 w-full border-t flex justify-between items-center">
          <p className="font-bold">패스키 관리</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </ContainerItem>
      <ContainerItem href="/security/reset/passowrd">
        <div className="py-5 w-full border-t flex justify-between items-center">
          <p className="font-bold">비밀번호</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </ContainerItem>
    </Container>
  );
}
