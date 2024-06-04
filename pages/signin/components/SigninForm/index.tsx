import { useForm } from "react-hook-form";
import { SigninFormData } from "../../types/type";
import { INVALID_EMAIL, INVALID_PASSWORD } from "../errorMessage";
import Input from "@/components/Input";
// import Button from "@/components/Button/Button";
import styles from "./SigninForm.module.scss";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const passwordRegex = /^.{8,}$/;

const SigninForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({ mode: "onChange" });

  const { email: emailError, password: passwordError } = errors;

  const onSubmit = (data: SigninFormData) => {
    console.log(data);
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
      {/* <Button text="로그인 하기" /> */}
    </form>
  );
};

export default SigninForm;
