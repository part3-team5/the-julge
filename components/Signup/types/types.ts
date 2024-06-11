export type SignupFormData = {
  email: string;
  password: string;
  passwordCheck: string;
  type: UserType;
};

export enum UserType {
  PART_TIME = "employee",
  OWNER = "employer",
}
