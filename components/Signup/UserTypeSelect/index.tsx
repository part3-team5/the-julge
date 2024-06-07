import { useState } from "react";
import styles from "./index.module.scss";
import TypeButton from "./TypeButton";

export default function UserTypeSelect() {
  const [checked, setChecked] = useState<boolean>(true);
  const handleClick = () => setChecked(!checked);

  return (
    <div className={styles.wrapper}>
      회원 유형
      <div className={styles.buttonContainer}>
        <TypeButton isChecked={checked} onClick={handleClick} text="알바님" />
        <TypeButton isChecked={!checked} onClick={handleClick} text="사장님" />
      </div>
    </div>
  );
}
