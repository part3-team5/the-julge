import { UserType } from "../types/types";
import React from "react";
import TypeButton from "./TypeButton";
import styles from "./index.module.scss";

type UserTypeSelectProps = {
  type: UserType;
  setType: (type: UserType) => void;
};

export default function UserTypeSelect({ type, setType }: UserTypeSelectProps) {
  return (
    <div className={styles.wrapper}>
      회원 유형
      <div className={styles.buttonContainer}>
        <TypeButton
          isChecked={type === UserType.PART_TIME}
          onClick={() => setType(UserType.PART_TIME)}
          text="알바님"
        />
        <TypeButton
          isChecked={type === UserType.OWNER}
          onClick={() => setType(UserType.OWNER)}
          text="사장님"
        />
      </div>
    </div>
  );
}
