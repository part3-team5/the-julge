import Image from "next/image";
import styles from "./TypeButton.module.scss";

type TypeButtonProps = {
  onClick: () => void;
  isChecked: boolean;
  text: string;
};

export default function TypeButton({
  onClick,
  isChecked,
  text,
}: TypeButtonProps) {
  return (
    <div className={styles.buttonWrapper}>
      <Image
        src={isChecked ? "/image/check-icon.svg" : "/image/uncheck-icon.svg"}
        alt="회원 유형"
        width={20}
        height={20}
      />
      <button
        className={`${styles.button} ${
          isChecked ? styles.checked : styles.unchecked
        }`}
        type="button"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
