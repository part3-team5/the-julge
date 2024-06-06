import { UseFormRegisterReturn } from "react-hook-form";

export interface DropdownProps {
  options: string[];
  register: UseFormRegisterReturn;
  id?: string;
}
