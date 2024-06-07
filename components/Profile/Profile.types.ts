import { MouseEventHandler } from "react";

export interface ProfileEmptyProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
export interface ProfileFormProps {
  onClose: () => void;
  onSubmit: () => void;
}
export interface ProfileData {
  name: string;
  phone: string;
  address: string;
  bio: string;
}
