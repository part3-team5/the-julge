import { MouseEventHandler } from "react";

export interface ShopEmptyProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export interface ShopViewProps {
  onEdit: () => void;
}

export interface ShopFormProps {
  onClose: () => void;
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

export interface ShopNoticeProps {
  onClose: () => void;
  onOpenForm: () => void;
}
