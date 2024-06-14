export interface ButtonProps {
  children: React.ReactNode;
  btnColorType: "orange" | "white" | "gray";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  btnCustom?: string;
  disabled?: boolean;
}
