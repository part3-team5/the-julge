import { useForm } from "react-hook-form";
import { SigninFormData } from "../types/Signin.types";
import {
  INVALID_EMAIL,
  INVALID_PASSWORD,
  WRONG_INFORMATION,
} from "../ErrorMessage/errorMessage";
import axios from "axios";
import { validateSigninData } from "@/utils/validateFormData";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./SigninForm.module.scss";
import { useRouter } from "next/router";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const passwordRegex = /^.{8,}$/;

const BASE_URL = "https://bootcamp-api.codeit.kr/api/0-1/the-julge";

const SigninForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({ mode: "onChange" });
  const router = useRouter();

  const { email: emailError, password: passwordError } = errors;

  const onSubmit = async (formData: SigninFormData) => {
    const { email, password } = formData;

    const isValid = validateSigninData(email, password);
    if (!isValid) {
      alert(WRONG_INFORMATION);
      return;
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/token`, formData);
      const { token, user } = data.item;
      const { href } = user;
      console.log(token, href);
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        alert(message);
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
      <Button btnColorType="orange">로그인</Button>
    </form>
  );
};

export default SigninForm;
