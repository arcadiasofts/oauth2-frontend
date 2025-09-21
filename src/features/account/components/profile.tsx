import { Container, ContainerItem } from "@/shared/layout/item-containers";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

export default function ProfileDefaultInfo() {
  return (
    <Container title="기본 프로필 정보">
      <ContainerItem href="/profile/profile-image">
        <div className="py-5 flex justify-between items-center">
          <div>
            <p className="font-bold">프로필 사진</p>
            <p className="text-sm">
              아르카디아 내의 모든 서비스에 활용되는 이미지입니다.
            </p>
          </div>
          <Avatar className="scale-140 mr-3">
            <AvatarImage
              src={
                "https://k.kakaocdn.net/dn/dcdixK/btsMAHGSopq/tei7YS5Qa1VpD5U2eNiRb1/img_640x640.jpg"
              }
            />
            <AvatarFallback>규</AvatarFallback>
          </Avatar>
        </div>
      </ContainerItem>
      <ContainerItem href="/profile/nickname">
        <div className="py-5 w-full border-t flex justify-between items-center">
          <p className="font-bold">닉네임</p>
          <p className="font-light text-sm">규연</p>
        </div>
      </ContainerItem>
      <ContainerItem href="/profile/handle">
        <div className="py-5 w-full border-t flex justify-between items-center">
          <p className="font-bold">사용자 핸들</p>
          <p className="font-light text-sm">pepsi_zerosugar</p>
        </div>
      </ContainerItem>
      <ContainerItem href="/profile/gender">
        <div className="py-5 w-full border-t flex justify-between items-center">
          <p className="font-bold">성별</p>
          <p className="font-light text-sm">남성</p>
        </div>
      </ContainerItem>
    </Container>
  );
}
