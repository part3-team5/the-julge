import classNames from "classnames/bind";
import styles from "../Profile.module.scss";
import Button from "@/components/Button";

const cx = classNames.bind(styles);

function ProfileEmpty() {
  return (
    <div className={cx("profile")}>
      <h1 className={cx("profile__title")}>내 프로필</h1>
      <div className={cx("profile__section")}>
        <p className={cx("profile__description")}>
          내 프로필을 등록하고 원하는 가게에 지원해 보세요.
        </p>
        <Button btnColorType="orenge">내 프로필 등록하기</Button>
      </div>
    </div>
  );
}

export default ProfileEmpty;
