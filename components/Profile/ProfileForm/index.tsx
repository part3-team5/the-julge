import classNames from "classnames/bind";
import styles from "../Profile.module.scss";
import { useForm } from "react-hook-form";

import { locations } from "@/constants/constants";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Input from "@/components/Input";

const cx = classNames.bind(styles);

function ProfileForm() {
  const { register } = useForm();

  return (
    <main className={cx(["profile"], ["main"])}>
      <h1 className={cx("title")}>내 프로필</h1>
      <form className={cx("form")}>
        <div className={cx("input-wrapper")}>
          <section className={cx("input__section")}>
            <Input
              label="이름"
              type="text"
              id="name"
              register={register("name", { required: true })}
            />
          </section>
          <section className={cx("input__section")}>
            <Input
              label="전화번호"
              type="tel"
              id="phon-number"
              register={register("phoneNumber", {
                required: true,
                pattern: /^\d{3}-\d{3,4}-\d{4}$/,
              })}
            />
          </section>
          <section className={cx("input__section")}>
            <label className={cx("label")} htmlFor="area">
              선호 지역
            </label>
            <Dropdown options={locations} id="area" />
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
