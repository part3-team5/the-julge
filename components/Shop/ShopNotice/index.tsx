import React from "react";
import styles from "../ShopView/ShopView.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/Button";

const cx = classNames.bind(styles);

const ShopNotice = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>등록한 공고</h1>
      </div>
      <div className={cx("notice")}>
        <div className={cx("notice-wrapper")}>
          <p>공고를 등록해 보세요.</p>
          <Button btnColorType="orange" btnCustom="userNoticeDetailed">
            공고 등록하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopNotice;
