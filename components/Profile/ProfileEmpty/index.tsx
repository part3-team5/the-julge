import classNames from "classnames/bind";
import styles from "../Profile.module.scss";
import Button from "@/components/Button";
import { ProfileEmptyProps } from "../profile.types";

const cx = classNames.bind(styles);

function ProfileEmpty({ onClick }: ProfileEmptyProps) {
  return (
    <div className={cx("profile")}>
      <h1 className={cx("title")}>내 프로필</h1>
      <div className={cx("box")}>
        <p className={cx("description")}>
          내 프로필을 등록하고 원하는 가게에 지원해 보세요.
        </p>
        <div className={cx("button-wrapper")}>
          <Button onClick={onClick} btnColorType="orange">
            내 프로필 등록하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEmpty;
