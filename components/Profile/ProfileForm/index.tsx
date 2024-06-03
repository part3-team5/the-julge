import classNames from "classnames/bind";
import styles from "../Profile.module.scss";
import Dropdown from "@/components/Dropdown";

const cx = classNames.bind(styles);

function ProfileEmpty() {
  return (
    <div className={cx("profile")}>
      <h1 className={cx("profile__title")}>내 프로필</h1>
      <form>
        <label htmlFor="name">이름</label>
        <input type="text" name="name" />
        <label htmlFor="phone-number">전화번호</label>
        <input type="number" name="phone-number" />
        <label htmlFor="name">선호 지역</label>
        <Dropdown />
        <label htmlFor="name">이름</label>

        <input type="text" name="name" />
      </form>
    </div>
  );
}

export default ProfileEmpty;
