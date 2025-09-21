import { Container, ContainerItem } from "@/shared/layout/item-containers";

export default function AccountInfo() {
  return (
    <Container title="계정 정보">
      <ContainerItem href="/profile/profile-image">
        <div className="py-5 w-full flex justify-between items-center">
          <p className="font-bold">이름</p>
          <p className="font-light text-sm">이규연</p>
        </div>
      </ContainerItem>
      <ContainerItem href="/profile/nickname">
        <div className="py-5 w-full border-t flex justify-between items-center">
          <p className="font-bold">전화번호</p>
          <p className="font-light text-sm">+82 010-40**-12**</p>
        </div>
      </ContainerItem>
      <ContainerItem href="/profile/gender">
        <div className="py-5 w-full border-t flex justify-between items-center">
          <p className="font-bold">주소</p>
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
