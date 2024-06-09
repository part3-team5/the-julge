import { MouseEventHandler } from "react";

export interface NoticeEmptyProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
export interface NoticeFormProps {
  onClose: () => void;
}

// export interface noticeData {
//   hourlyPay: string;
//   startsAt: string;
//   workhour: string;
//   description: string;
// }
// export interface FormData {
//   hourlyPay: string;
//   startsAt: string;
//   workhour: string;
//   description: string;
// }
