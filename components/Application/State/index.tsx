import classNames from "classnames/bind";
import styles from "./StateButton.module.scss";
import { ButtonState, StateButtonProps } from "./State.types";

const cx = classNames.bind(styles);

function StateButton({ state }: StateButtonProps) {
  const buttonClasses = cx({
    approve: state === "approve",
    refuse: state === "refuse",
    waiting: state === "waiting",
  });

  const buttonText: Record<ButtonState, string> = {
    approve: "승인 완료",
    refuse: "거절",
    waiting: "대기중",
  };

  return <div className={buttonClasses}>{buttonText[state]}</div>;
}

export default StateButton;
