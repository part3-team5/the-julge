import { MouseEventHandler } from "react";

export interface NoticeEmptyProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
export interface NoticeFormProps {
  onClose: () => void;
  onSubmit: () => void;
}
export interface NoticeData {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}
export interface NoticeFormData {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}

export interface ShopNoticeViewProps {
  noticeData: NoticeData | null;
}
