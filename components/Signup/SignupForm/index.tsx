import { useForm } from "react-hook-form";
import { SignupFormData, UserType } from "../types/types";
import { validateSignupData } from "@/utils/validateFormData";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  INVALID_EMAIL,
  INVALID_PASSWORD,
} from "../../Signin/ErrorMessage/errorMessage";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import UserTypeSelect from "../UserTypeSelect";
import styles from "./SignupForm.module.scss";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/;

const BASE_URL = "https://bootcamp-api.codeit.kr/api/0-1/the-julge";

export default function SignupForm() {
  const [type, setType] = useState<UserType>(UserType.PART_TIME);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>({ mode: "onChange" });

  const {
    email: emailError,
    password: passwordError,
    passwordCheck: passwordCheckError,
  } = errors;

  const onSubmit = async (formData: SignupFormData) => {
    try {
      validateSignupData(formData);
      const { email, password } = formData;
      const request = { email, password, type };
      await axios.post(`${BASE_URL}/users`, request);

      alert("가입이 완료되었습니다!");
      router.push("/signin");
    } catch (error) {
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
          pattern: {
            value: passwordRegex,
            message: INVALID_PASSWORD,
          },
        })}
      />
      <Input
        label="비밀번호 확인"
        error={passwordCheckError}
        type="password"
        register={register("passwordCheck", {
          pattern: {
            value: passwordRegex,
            message: INVALID_PASSWORD,
          },
        })}
      />
      <UserTypeSelect type={type} setType={setType} />
      <Button btnColorType="orange">가입하기</Button>
    </form>
  );
}

//
