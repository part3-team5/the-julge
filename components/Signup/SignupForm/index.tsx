import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignupFormData, UserType } from "../types/types";
import { validateSignupData } from "@/utils/validateFormData";
import axios from "axios";
import { useRecoilState } from "recoil";
import { signupState } from "@/atoms/userAtom";
import Button from "@/components/Button";
import Input from "@/components/Input";
import UserTypeSelect from "@/components/Signup/UserTypeSelect";
import styles from "./SignupForm.module.scss";
import {
  INVALID_EMAIL,
  INVALID_PASSWORD,
} from "../../Signin/ErrorMessage/errorMessage";
import { useRouter } from "next/router";
import { emailRegex, passwordRegex } from "@/utils/signupRegex";
import { BASE_URL } from "@/constants/constants";

export default function SignupForm() {
  const [type, setType] = useState<UserType>(UserType.PART_TIME);
  const [_, setSignupState] = useRecoilState(signupState);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm<SignupFormData>({ mode: "onChange" });
  const router = useRouter();

  const onSubmit = async (formData: SignupFormData) => {
    try {
      // 회원가입 데이터 유효성 검사
      const isValid = validateSignupData(formData);
      if (!isValid) return;

      // 회원가입 요청 보내기
      const { email, password } = formData;
      const request = { email, password, type };
      await axios.post(`${BASE_URL}/users`, request);

      // 회원가입 완료 시 Recoil 상태 업데이트 및 페이지 이동
      setSignupState(formData);
      alert("가입이 완료되었습니다!");
      router.push("/signin");
    } catch (error) {
      // 에러 처리
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        alert(message);
      } else if (error instanceof TypeError) {
        alert(error.message);
      } else if (error instanceof ReferenceError) {
        setError("passwordCheck", { message: error.message });
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="이메일"
        error={errors?.email ? errors.email : undefined}
        register={register("email", {
          required: "이메일을 입력하세요.",
          pattern: {
            value: emailRegex,
            message: INVALID_EMAIL,
          },
        })}
      />
      <Input
        label="비밀번호"
        error={errors?.password ? errors.password : undefined}
        type="password"
        register={register("password", {
          required: "비밀번호를 입력하세요.",
          pattern: {
            value: passwordRegex,
            message: INVALID_PASSWORD,
          },
        })}
      />
      <Input
        label="비밀번호 확인"
        error={errors?.passwordCheck ? errors.passwordCheck : undefined}
        type="password"
        register={register("passwordCheck", {
          required: "비밀번호를 다시 입력하세요.",
          validate: (value) =>
            value === getValues("password") || "비밀번호가 일치하지 않습니다.",
        })}
      />
      <UserTypeSelect type={type} setType={setType} />
      <Button btnColorType="orange">가입하기</Button>
    </form>
  );
}
