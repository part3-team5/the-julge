import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignupFormData, UserType } from "../types/types";
import { validateSignupData } from "@/utils/validateFormData";
import axios from "axios";
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
import ConfirmModal from "@/components/Modal/ModalContent/AlertModal";
import { IModalProps } from "@/components/Modal/Modal.types";
import { useToast } from "@/components/Toast/ToastConenxt";

export default function SignupForm() {
  const [type, setType] = useState<UserType>(UserType.PART_TIME);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm<SignupFormData>({ mode: "onChange" });
  const router = useRouter();
  const { showToast } = useToast();

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<IModalProps>({
    modalType: "alert",
    content: "",
    btnName: ["확인"],
  });

  const onSubmit = async (formData: SignupFormData) => {
    try {
      const isValid = validateSignupData(formData);
      if (!isValid) return;

      const { email, password } = formData;
      const request = { email, password, type };
      await axios.post(`${BASE_URL}/users`, request);

      setModalData({
        modalType: "alert",
        content: "가입이 완료되었습니다!",
        btnName: ["확인"],
        callBackFnc: () => router.push("/signin"),
      });
      setModalOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        showToast(message);
      } else if (error instanceof TypeError) {
        showToast(error.message);
      } else if (error instanceof ReferenceError) {
        setError("passwordCheck", { message: error.message });
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
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
              value === getValues("password") ||
              "비밀번호가 일치하지 않습니다.",
          })}
        />
        <UserTypeSelect type={type} setType={setType} />
        <Button btnColorType="orange">가입하기</Button>
      </form>
      {isModalOpen && (
        <ConfirmModal modalData={modalData} closeFunction={closeModal} />
      )}
    </>
  );
}
