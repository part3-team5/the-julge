import styles from "./Input.module.scss";
import classNames from "classnames/bind";
import { InputProps } from "./types/Input.types";
import { FieldError } from "react-hook-form";
import phoneInsertHyphen from "@/utils/phoneInsertHyphen";

const cx = classNames.bind(styles);

export default function Input({
  label,
  type = "text",
  value,
  error,
  register,
  id,
  isTextArea = false,
  suffix,
}: InputProps) {
  const hasError = !!error;

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = e.target.value;
    const formattedPhoneNumber = phoneInsertHyphen(inputPhoneNumber);
    e.target.value = formattedPhoneNumber;
  };

  return (
    <div className={cx("inputWrapper")}>
      <label className={cx("styledLabel")}>{label}</label>
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          placeholder="입력"
          className={cx("styledTextarea", { error: hasError })}
          {...register}
        />
      ) : (
        <div className={cx("inputContainer")}>
          <input
            id={id}
            type={type}
            value={value}
            placeholder="입력"
            className={cx("styledInput", { error: hasError })}
            {...register}
            onChange={type === "tel" ? handlePhoneNumberChange : undefined}
            maxLength={type === "tel" ? 13 : undefined}
          />
          {suffix && <span className={cx("suffix")}>{suffix}</span>}
        </div>
      )}
      {error && (
        <span className={cx("styledWarning")}>
          {(error as FieldError).message}
        </span>
      )}
    </div>
  );
}
