import { useForm } from "react-hook-form";
import axios from "axios";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styles from "./SigninForm.module.scss";
import { useRouter } from "next/router";

export function validateSigninData(email: string, password: string) {
  if (email.length == 0 || password.length == 0) {
    return false;
  }
  return true;
}

type SigninFormData = {
  email: string;
  password: string;
};

const INVALID_EMAIL = "이메일 형식으로 입력해 주세요.";
const INVALID_PASSWORD = "비밀번호는 8자 이상 입력해 주세요.";
const WRONG_INFORMATION = "아이디, 비밀번호를 확인해주세요.";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const passwordRegex = /^.{8,}$/;

const BASE_URL = "https://bootcamp-api.codeit.kr/api/0-1/the-julge";

const SigninForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({ mode: "onChange" });

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
      const { token } = data.item;
      localStorage.setItem("token", token);
      console.log(token);
      router.push("/profile");
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
