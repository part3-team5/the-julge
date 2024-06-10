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
export interface FormData {
  name: string;
  phoneNumber: string;
  area: string;
  introduction: string;
}
