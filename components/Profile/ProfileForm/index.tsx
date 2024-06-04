import classNames from "classnames/bind";
import styles from "../Profile.module.scss";
import Dropdown from "@/components/Dropdown";
import { areaOptions } from "@/constants/area";
import Button from "@/components/Button";

const cx = classNames.bind(styles);

function ProfileForm() {
  return (
    <main className={cx(["profile"], ["main"])}>
      <h1 className={cx("title")}>내 프로필</h1>
      <form className={cx("form")}>
        <div className={cx("input-wrapper")}>
          <section className={cx("input__section")}>
            <label className={cx("label")} htmlFor="name">
              이름
            </label>
            <input className={cx("input")} type="text" id="name" />
          </section>
          <section className={cx("input__section")}>
            <label className={cx("label")} htmlFor="phone-number">
              전화번호
            </label>
            <input className={cx("input")} type="tel" id="phone-number" />
          </section>
          <section className={cx("input__section")}>
            <label className={cx("label")} htmlFor="area">
              선호 지역
            </label>
            <Dropdown options={areaOptions} id="area" />
          </section>
        </div>
        <section className={cx("textarea__section")}>
          <label className={cx("label")} htmlFor="introduction">
            소개
          </label>
          <textarea className={cx("textarea")} id="introduction" />
        </section>
        <div className={cx("button__section")}>
          <div className={cx("button-wrapper")}>
            <Button btnColorType="orange">프로필 등록</Button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default ProfileForm;
