import classNames from "classnames/bind";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import styles from "../Profile.module.scss";
import { LOCATIONS } from "@/constants/constants";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { FormData, ProfileData, ProfileFormProps } from "../Profile.types";
import { instance } from "@/utils/instance";
import ConfirmModal from "@/components/Modal/ModalContent/AlertModal";
import { IModalProps } from "@/components/Modal/Modal.types";
import { getUserId } from "@/utils/jwt";

const cx = classNames.bind(styles);

const ProfileForm: React.FC<ProfileFormProps> = ({ onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [userId, setUserId] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [modalData, setModalData] = useState<IModalProps>({
    modalType: "",
    content: "",
    btnName: [""],
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = getUserId();
      if (userId) {
        setUserId(userId);
        console.log(userId);
      }
    };
    fetchUserId();
  }, []);

  const handleCloseAlert = () => {
    setShowAlert(false);
    onClose();
  };

  const handleSubmitForm = async (data: FormData) => {
    const body: ProfileData = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      bio: data.bio,
    };

    try {
      const response = await instance.put(`/users/${userId}`, body);
      if (response.status === 200) {
        setModalData({
          modalType: "alert",
          content: "등록이 완료되었습니다.",
          btnName: ["확인"],
        });
        setShowAlert(true);
        onSubmit();
      }
    } catch (error) {
      setModalData({
        modalType: "alert",
        content: "오류가 발생했습니다. 다시 시도해주세요.",
        btnName: ["확인"],
      });
      setShowAlert(true);
    }
  };

  return (
    <main className={cx(["profile"], ["main"])}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>내 프로필</h1>
        <Image
          src="/image/icon/shop_close.svg"
          width={32}
          height={32}
          alt="close button"
          onClick={onClose}
          className={cx("close-button")}
        />
      </div>
      <form className={cx("form")} onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={cx("input-wrapper")}>
          <section className={cx("input__section")}>
            <Input
              label="이름"
              type="text"
              id="name"
              register={register("name", {
                required: "이름을 입력하세요.",
                pattern: {
                  value: /^[가-힣]+$/,
                  message: "자음과 모음이 조합된 형태로 입력해주세요.",
                },
              })}
              error={errors.name}
            />
          </section>
          <section className={cx("input__section")}>
            <Input
              label="전화번호"
              type="tel"
              id="phone"
              register={register("phone", {
                required: true,
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: "전화번호 형식이 올바르지 않습니다.",
                },
              })}
              error={errors.phone}
            />
          </section>
          <section className={cx("input-section")}>
            <label className={cx("label")} htmlFor="locations">
              선호 지역
            </label>
            <Dropdown
              options={LOCATIONS}
              id="address"
              onChange={(value) => {
                setValue("address", value);
              }}
            />
          </section>
        </div>
        <section className={cx("textarea-section")}>
          <Input
            label="소개"
            type="text"
            id="bio"
            register={register("bio", { required: true })}
            isTextArea={true}
          />
        </section>
        <div className={cx("button-section")}>
          <div className={cx("button-wrapper")}>
            <Button btnColorType="orange">등록하기</Button>
          </div>
        </div>
      </form>
      {showAlert && (
        <div className={cx("overlay")}>
          <ConfirmModal
            modalData={modalData}
            closeFunction={handleCloseAlert}
          />
        </div>
      )}
    </main>
  );
};

export default ProfileForm;
