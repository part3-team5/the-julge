import classNames from "classnames/bind";
import styles from "../profile.module.scss";
import Button from "@/components/Button";
import { MouseEventHandler } from "react";

const cx = classNames.bind(styles);

interface ProfileEmptyProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function ProfileEmpty({ onClick }: ProfileEmptyProps) {
  return (
    <div className={cx("profile")}>
      <h1 className={cx("profile__title")}>내 프로필</h1>
      <div className={cx("profile__box")}>
        <p className={cx("profile-description")}>
          내 프로필을 등록하고 원하는 가게에 지원해 보세요.
        </p>
        <div className={cx("profile__button--wrapper")}>
          <Button onClick={onClick} btnColorType="orange">
            내 프로필 등록하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEmpty;
