import React from "react";
import UiButton from "../UiButton";
import NotiButton from "../NotiButton";
import styles from "./HeaderButtons.module.scss";
import { HeaderButtonsProps } from "./HeaderButton.types";

export default function HeaderButtons({
  userType,
  hasNotification,
  handleClickMovePage,
}: HeaderButtonsProps) {
  return (
    <div className={styles.headerButtons}>
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
    </div>
  );
}
