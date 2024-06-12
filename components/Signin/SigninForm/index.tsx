import { useForm } from "react-hook-form";
import { SigninFormData } from "../types/Signin.types";
import { INVALID_EMAIL, INVALID_PASSWORD, WRONG_INFORMATION } from "../ErrorMessage/errorMessage";
import axios from "axios";
import { validateSigninData } from "@/utils/validateFormData";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./SigninForm.module.scss";
import { useRouter } from "next/router";
import { useToast } from "@/components/Toast/ToastConenxt";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "@/atoms/userAtom";
import { useEffect } from "react";
import { BASE_URL } from "@/constants/constants";
import { emailRegex } from "@/utils/signupRegex";

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({ mode: "onChange" });
  const { showToast } = useToast();
  const router = useRouter();
  const { email: emailError, password: passwordError } = errors;
  const setAuthState = useSetRecoilState(authState);
  const authStateValue = useRecoilValue(authState);

  // Recoil 상태 콘솔 출력
  useEffect(() => {
    console.log("Current auth state:", authStateValue);
  }, [authStateValue]);

  const onSubmit = async (formData: SigninFormData) => {
    if (!validateSigninData(formData)) {
      showToast(WRONG_INFORMATION);
      return;
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/token`, formData);
      const { token, user } = data.item;
      const { id, type } = user.item;

      document.cookie = `jwt=Bearer ${token}; path=/`;
      document.cookie = `id=${id}; path=/`;
      document.cookie = `userType=${type}; path=/`;

      // Recoil 상태 업데이트
      setAuthState({
        isAuthenticated: true,
        user: {
          id,
          type,
          email: formData.email,
        },
      });

      router.push("/");
    } catch (error: any) {
      const message = error.response?.data?.message || "An unexpected error occurred.";
      showToast(message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="이메일"
        error={emailError}
        register={register("email", {
          pattern: {
            value: emailRegex,
            message: INVALID_EMAIL,
          },
        })}
      />
      <Input
        label="비밀번호"
        error={passwordError}
        type="password"
        register={register("password", {
          required: "Password is required",
        })}
      />
      <Button btnColorType="orange">로그인</Button>
    </form>
  );
}
