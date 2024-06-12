export type ApplicationStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "canceled";

export type ButtonState = "accepted" | "rejected" | "pending";

export interface StateButtonProps {
  state: ApplicationStatus;
}
