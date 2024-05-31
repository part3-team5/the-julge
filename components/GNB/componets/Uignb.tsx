import Image from "next/image";
import styled from "@emotion/styled";
import HeaderButton from "./HeaderButton";
import SearchBar from "./SearchBar";

interface GnbProps {
  userType?: "employee" | "employer" | "guest" | undefined;
  hasNotification: boolean;
  handleClickMovePage: (pathname?: string) => void;
}

export default function UiGnb({
  userType,
  hasNotification,
  handleClickMovePage,
}: GnbProps) {
  return (
    <GnbWrapper>
      <Logo href="/">
        <Image src="/image/logo.svg" alt="더줄게" width={112} height={40} />
      </Logo>
      <SearchBar />
      <HeaderButton
        userType={userType}
        handleClickMovePage={handleClickMovePage}
        hasNotification={hasNotification}
      />
    </GnbWrapper>
  );
}

const GnbWrapper = styled.div`
  max-width: 968px;
  margin: 0 auto;
  padding: 15px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas: "logo . search buttons";
  align-items: center;
  gap: 10px;
  @media only screen and (max-width: 1028px) {
    padding: 15px 32px;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 16px;
    grid-template-areas:
      "logo buttons"
      "search search";
  }
`;

//Logo
const Logo = styled.a`
  grid-area: logo;
  width: 112px;
  height: 40px;
  margin-right: 40px;
  @media only screen and (max-width: 1028px) {
    margin-right: 32px;
  }
  @media only screen and (max-width: 768px) {
    width: 84px;
    height: 30px;
    margin-right: auto;
  }
`;
