import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import styles from "./RegisterNotice.module.scss";
import Input from "../Input";
import Button from "../Button";
// import Image from "next/image";

const cx = classNames.bind(styles);

export default function Register() {
  const { register } = useForm();

  return (
    <main className={cx(["profile"], ["main"])}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>공고 등록</h1>
        {/* <Image
            src="/image/icon/shop_close.svg"
            width={32}
            height={32}
            alt="close button"
            onClick={onClose}
            className={cx("close-button")}
          /> */}
      </div>
      <form className={cx("form")}>
        <div className={cx("input-wrapper")}>
          <section className={cx("input__section")}>
            <Input
              label="시급"
              type="text"
              id="hourlyPay"
              register={register("hourlyPay", { required: true })}
              suffix="원"
            />
          </section>
          <section className={cx("input__section")}>
            <Input
              label="시작 일시"
              type="datetime-local"
              id="startsAt"
              register={register("startsAt", {
                required: true,
              })}
            />
          </section>
          <section className={cx("input-section")}>
            <Input
              label="업무 시간"
              type="text"
              id="workhour"
              register={register("workhour", {
                required: true,
              })}
              suffix="시간"
            />
          </section>
        </div>
        <section className={cx("textarea-section")}>
          <Input
            label="공고 설명"
            type="text"
            id="description"
            register={register("description", { required: true })}
            isTextArea={true}
          />
        </section>
        <div className={cx("button-section")}>
          <div className={cx("button-wrapper")}>
            <Button btnColorType="orange">등록하기</Button>
          </div>
        </div>
      </form>
      {/* {showAlert && (
          <div className={cx("overlay")}>
            <ConfirmModal
              modalData={modalData}
              closeFunction={handleCloseAlert}
            />
          </div>
        )} */}
    </main>
  );
}
