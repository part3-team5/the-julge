import {
  WRONG_INFORMATION,
  PASSWORD_NOT_MATCHING,
} from "@/components/Signin/ErrorMessage/errorMessage";
import { SigninFormData } from "@/components/Signin/types/Signin.types";
import { SignupFormData } from "@/components/Signup/types/types";

export function validateSigninData(formData: SigninFormData) {
  const { email, password } = formData;
  if (email.length == 0 || password.length == 0) {
    return false;
  }
  return true;
}

export function validateSignupData(formData: SignupFormData) {
  const { email, password, passwordCheck } = formData;
  if (email.length == 0 || password.length == 0 || passwordCheck.length == 0) {
    throw new TypeError(WRONG_INFORMATION);
  }
  if (password !== passwordCheck) {
    throw new ReferenceError(PASSWORD_NOT_MATCHING);
  }
  return true;
}
