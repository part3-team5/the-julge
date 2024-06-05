import { InputProps } from "@/types/InputTypes";
import styles from "./Input.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Input({
  label,
  type = "text",
  value,
  error,
  register,
  id,
}: InputProps) {
  const hasError = !!error;

  return (
    <div className={cx("inputWrapper")}>
      <label className={cx("styledLabel")}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder="입력"
        className={cx("styledInput", { error: hasError })}
        {...register}
      />
      {error && <span className={cx("styledWarning")}>{error.message}</span>}
    </div>
  );
}
