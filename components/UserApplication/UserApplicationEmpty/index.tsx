import classNames from "classnames/bind";
import Link from "next/link";

import styles from "./UserApplicationEmpty.module.scss";
import Button from "@/components/Button";

const cx = classNames.bind(styles);

function ApplicationEmpty() {
  return (
    <div className={cx("application")}>
      <h1 className={cx("title")}>신청 내역</h1>
      <div className={cx("box")}>
        <p className={cx("description")}>아직 신청 내역이 없어요. </p>
        <div className={cx("button-wrapper")}>
          <Link className={cx("link")} href="/">
            <Button btnColorType="orange">공고 보러가기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ApplicationEmpty;
