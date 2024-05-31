import styled from "@emotion/styled";
import UiButton from "./UiButton";
import NotiButton from "./NotiButton";

interface HeaderButtonsProps {
  userType?: "employee" | "employer" | "guest" | undefined;
  hasNotification: boolean;
  handleClickMovePage: (pathname?: string) => void;
}

export default function HeaderButtons({
  userType,
  hasNotification,
  handleClickMovePage,
}: HeaderButtonsProps) {
  const HeaderButtons = styled.div`
    grid-area: buttons;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    @media only screen and (max-width: 768px) {
      justify-content: flex-end;
    }
  `;

  return (
    <HeaderButtons>
      {userType === "guest" && (
        <>
          <UiButton
            name="로그인"
            id="login"
            handleClickButton={() => handleClickMovePage("signin")}
          />
          <UiButton
            name="회원가입"
            id="signup"
            handleClickButton={() => handleClickMovePage("signup")}
          />
        </>
      )}
      {userType === "employer" && (
        <>
          <UiButton
            name="내 가게"
            handleClickButton={() => handleClickMovePage("my-shop")}
          />
          <UiButton
            name="로그아웃"
            handleClickButton={() => handleClickMovePage("my-shop")}
          />
          <NotiButton activeStatus={hasNotification ? "active" : "inactive"} />
        </>
      )}
      {userType === "employee" && (
        <>
          <UiButton
            name="내 프로필"
            handleClickButton={() => handleClickMovePage("my-profile")}
          />
          <UiButton
            name="로그아웃"
            handleClickButton={() => handleClickMovePage("my-shop")}
          />
          <NotiButton activeStatus={hasNotification ? "active" : "inactive"} />
        </>
      )}
    </HeaderButtons>
  );
}
