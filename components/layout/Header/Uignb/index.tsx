import React from "react";
import Image from "next/image";
import styles from "./UiGnb.module.scss";
import HeaderButton from "../HeaderButton";
import SearchBar from "../SearchBar";
import { GnbProps } from "../types/Gnb.types";
import Link from "next/link";

export default function UiGnb({ userType, handleClickMovePage }: GnbProps) {
  return (
    <div className={styles.gnbWrapper}>
      <Link className={styles.logo} href="/">
        <Image src="/image/logo.svg" alt="더줄게" width={112} height={40} />
      </Link>
      <SearchBar />
      <HeaderButton userType={userType} handleClickMovePage={handleClickMovePage} />
    </div>
  );
}
