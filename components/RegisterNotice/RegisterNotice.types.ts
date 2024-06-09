import { MouseEventHandler } from "react";

export interface ProfileEmptyProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
export interface RegisterNoticeProps {
  onClose: () => void;
  onSubmit: () => void;
}
export interface noticeData {
  hourlyPay: string;
  startsAt: string;
  workhour: string;
  description: string;
}
export interface FormData {
  hourlyPay: string;
  startsAt: string;
  workhour: string;
  description: string;
}
