import { InputProps } from "@/types/InputTypes";
import styles from "./input.module.scss";
import classNames from "classnames";

export default function Input({
  label,
  type = "text",
  value,
  error,
  register,
}: InputProps) {
  const hasError: boolean = !!error;

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.styledLabel}>{label}</label>
      <input
        type={type}
        value={value}
        placeholder="입력"
        className={classNames(styles.styledInput, { [styles.error]: hasError })}
        {...register}
      />
      {error && <span className={styles.styledWarning}>{error.message}</span>}
    </div>
  );
}
