import React from "react";
import styles from "../sass/UiButton.module.scss";

interface ButtonProps {
  name?: string;
  id?: string;
  handleClickButton: (pathname?: string) => void;
}

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
