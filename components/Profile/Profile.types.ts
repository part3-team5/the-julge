import { MouseEventHandler } from "react";

export interface ProfileEmptyProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface ProfileFormProps {
  onClose: () => void;
}
