export type SignupFormData = {
  email: string;
  password: string;
  passwordCheck: string;
};

export enum UserType {
  PART_TIME = "employee",
  OWNER = "employer",
}
