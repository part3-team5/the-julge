import React from "react";
import Image from "next/image";
import styles from "./UiGnb.module.scss";
import HeaderButton from "../HeaderButton";
import SearchBar from "../SerchBar";
import { GnbProps } from "../types/Gnb.types";

export default function UiGnb({
  userType,
  hasNotification,
  handleClickMovePage,
}: GnbProps) {
  return (
    <div className={styles.gnbWrapper}>
      <a className={styles.logo} href="/">
        <Image src="/image/logo.svg" alt="더줄게" width={112} height={40} />
      </a>
      <SearchBar />
      <HeaderButton
        userType={userType}
        handleClickMovePage={handleClickMovePage}
        hasNotification={hasNotification}
      />
    </div>
  );
}
