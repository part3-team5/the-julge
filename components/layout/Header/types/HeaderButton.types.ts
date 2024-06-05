export interface HeaderButtonsProps {
  userType?: "employee" | "employer" | "guest" | undefined;
  hasNotification: boolean;
  handleClickMovePage: (pathname?: string) => void;
}
