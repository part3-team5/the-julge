import { MouseEventHandler } from "react";

export interface ShopEmptyProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface ShopFormProps {
  onClose?: () => void;
  onEdit?: () => void;
}

export interface FormData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}
