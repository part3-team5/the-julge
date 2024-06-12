import React from "react";
import UiButton from "../UiButton";
import NotiButton from "../NotiButton";
import styles from "./HeaderButtons.module.scss";
import { HeaderButtonsProps } from "../types/HeaderButton.types";
import { useRouter } from "next/router";
import { deleteCookie } from "@/hooks/useLogout";

export default function HeaderButtons({ userType, handleClickMovePage }: HeaderButtonsProps) {
  const router = useRouter();
  return (
    <div className={styles.headerButtons}>
      {userType === "" && (
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
          <UiButton name="내 가게" handleClickButton={() => handleClickMovePage("my-shop")} />
          <UiButton name="로그아웃" handleClickButton={() => deleteCookie(router)} />
          <NotiButton />
        </>
      )}
      {userType === "employee" && (
        <>
          <UiButton name="내 프로필" handleClickButton={() => handleClickMovePage("my-profile")} />
          <UiButton name="로그아웃" handleClickButton={() => deleteCookie(router)} />
          <NotiButton />
        </>
      )}
    </div>
  );
}
