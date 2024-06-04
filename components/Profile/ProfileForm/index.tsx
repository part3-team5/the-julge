import classNames from "classnames/bind";
import styles from "../Profile.module.scss";
import Dropdown from "@/components/Dropdown";
import { areaOptions } from "@/constants/area";
import Button from "@/components/Button";
const cx = classNames.bind(styles);

function ProfileForm() {
  return (
    <main className={cx(["profile"], ["profile__main"])}>
      <h1 className={cx("profile__title")}>내 프로필</h1>
      <form className={cx("profile__form")}>
        <div className={cx("profile__input-wrapper")}>
          <section className={cx("profile__input__section")}>
            <label className={cx("profile__label")} htmlFor="name">
              이름
            </label>
            <input className={cx("profile__input")} type="text" id="name" />
          </section>
          <section className={cx("profile__input__section")}>
            <label className={cx("profile__label")} htmlFor="phone-number">
              전화번호
            </label>
            <input
              className={cx("profile__input")}
              type="tel"
              id="phone-number"
            />
          </section>
          <section className={cx("profile__input__section")}>
            <label className={cx("profile__label")} htmlFor="area">
              선호 지역
            </label>
            <Dropdown options={areaOptions} id="area" />
          </section>
        </div>
        <section className={cx("profile__textarea__section")}>
          <label className={cx("profile__label")} htmlFor="introduction">
            소개
          </label>
          <textarea className={cx("profile__textarea")} id="introduction" />
        </section>
        <div className={cx("profile__button__section")}>
          <div className={cx("button-wrapper")}>
            <Button btnColorType="orange">프로필 등록</Button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default ProfileForm;
