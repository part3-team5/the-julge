export interface ButtonProps {
  children: React.ReactNode;
  btnColorType: "orenge" | "white" | "gray";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
