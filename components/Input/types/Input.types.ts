import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export type InputProps = {
  label: string;
  type?: "text" | "password" | "tel" | "number" | "datetime-local";
  value?: string | number;
  error?: FieldError;
  register: UseFormRegisterReturn;
  id?: string;
  isTextArea?: boolean;
  suffix?: string;
};
