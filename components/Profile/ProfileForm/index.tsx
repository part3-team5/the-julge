import classNames from "classnames/bind";
import styles from "../Profile.module.scss";

const cx = classNames.bind(styles);

function ProfileEmpty() {
  return <div className={cx("profile")}></div>;
}

export default ProfileEmpty;
