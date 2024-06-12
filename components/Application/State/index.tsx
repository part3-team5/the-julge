import classNames from "classnames/bind";
import styles from "./StateButton.module.scss";
import {
  ApplicationStatus,
  ButtonState,
  StateButtonProps,
} from "./State.types";

const cx = classNames.bind(styles);

const mapStateToButtonState = (state: ApplicationStatus): ButtonState => {
  switch (state) {
    case "accepted":
      return "accepted";
    case "rejected":
      return "rejected";
    case "pending":
    case "canceled":
      return "pending";
    default:
      return "pending";
  }
};

function StateButton({ state }: StateButtonProps) {
  const buttonState = mapStateToButtonState(state);

  const buttonClasses = cx({
    approve: buttonState === "accepted",
    refuse: buttonState === "rejected",
    waiting: buttonState === "pending",
  });

  const buttonText: Record<ButtonState, string> = {
    accepted: "승인 완료",
    rejected: "거절",
    pending: "대기중",
  };

  return <div className={buttonClasses}>{buttonText[buttonState]}</div>;
}

export default StateButton;
