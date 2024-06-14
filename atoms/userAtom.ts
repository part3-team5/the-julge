import { atom } from "recoil";
import { UserType } from "@/components/Signup/types/types";

export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
  },
});

export const signupState = atom({
  key: "signupState",
  default: {
    email: "",
    password: "",
    passwordCheck: "",
    type: UserType.PART_TIME,
  },
});
