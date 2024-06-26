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

      // localStorage에 accessToken 저장
      localStorage.setItem("accessToken", token);

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
          required: "아이디를 입력하세요.",
        })}
      />
      <Input
        label="비밀번호"
        error={passwordError}
        type="password"
        register={register("password", {
          required: "비밀번호를 입력하세요.",
        })}
      />
      <Button btnColorType="orange">로그인</Button>
    </form>
  );
}
