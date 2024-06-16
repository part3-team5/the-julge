import { MouseEventHandler } from "react";

export interface ProfileEmptyProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface ProfileFormProps {
  onClose: () => void;
}

export interface ProfileDataProps {
  name: string;
  phone: string;
  address: string;
  bio: string;
}

export interface FormData {
  name: string;
  phone: string;
  address: string;
  bio: string;
}

export interface ProfileViewProps {
  onEdit: () => void;
}
