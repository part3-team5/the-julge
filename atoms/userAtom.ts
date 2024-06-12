import { atom } from "recoil";
import { UserType } from "@/components/Signup/types/types";

interface User {
  id: string;
  type: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
    user: null,
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
