import React from "react";
import styles from "./UiButton.module.scss";
import { ButtonProps } from "./UiButton.types";

export default function UiButton({ name, id, handleClickButton }: ButtonProps) {
  const handleClickMovePage = () => {
    handleClickButton(id as string);
  };

  return (
    <button
      className={styles.uiButton}
      type="button"
      onClick={handleClickMovePage}
    >
      {name}
    </button>
  );
}
