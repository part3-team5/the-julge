import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import classNames from "classnames/bind";
import ConfirmModal from "@/components/Modal/ModalContent/AlertModal";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import Image from "next/image";
import styles from "../Profile.module.scss";
import { LOCATIONS } from "@/constants/constants";
import { ProfileDataProps, ProfileFormProps } from "../Profile.types";
import { IModalProps } from "@/components/Modal/Modal.types";
import { instance } from "@/utils/instance";
import { getUserId } from "@/utils/jwt";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { profileAtom } from "@/atoms/profileAtom";

const cx = classNames.bind(styles);

function ProfileEdit({ onClose }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileDataProps>();

  const profileValue = useRecoilValue(profileAtom);
  const [profileData, setProfileData] = useRecoilState(profileAtom);
  const [initAddress, setInitAddress] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [modalData, setModalData] = useState<IModalProps>({
    modalType: "",
    content: "",
    btnName: [""],
  });
  const userId = getUserId();

  console.log(profileValue);
  useEffect(() => {
    if (profileValue) {
      setValue("name", profileValue.name);
      setValue("phone", profileValue.phone);
      setValue("address", profileValue.address);
      setValue("bio", profileValue.bio);

      setInitAddress(profileValue.address);
    }
  }, [profileValue, , setValue, setInitAddress]);

  const handleCloseAlert = () => {
    setShowAlert(false);
    onClose();
  };

  const handleSubmitForm = async (data: ProfileDataProps) => {
    try {
      const response = await instance.put(`/users/${userId}`, data);
      if (response.status === 200) {
        setProfileData(data);
        setModalData({
          modalType: "alert",
          content: "프로필 수정이 완료되었습니다.",
          btnName: ["확인"],
        });
        setShowAlert(true);
      } else {
        alert("프로필 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("수정 안됨:", error);
    }
  };

  return (
    <div className={cx("profile", "main")}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>프로필</h1>
        <Image
          src="/image/icon/close.svg"
          width={24}
          height={24}
          alt="close button"
          onClick={onClose}
          className={cx("close-button")}
        />
      </div>
      <form className={cx("form")} onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={cx("input-wrapper")}>
          <section className={cx("input-section")}>
            <Input
              label="이름"
              type="text"
              register={register("name", {
                required: "이름을 입력하세요.",
                pattern: {
                  value: /^[가-힣]+$/,
                  message:
                    "이름은 한글 자음과 모음이 조합된 형태로 입력해주세요.",
                },
              })}
              error={errors.name}
            />
          </section>
          <section className={cx("input-section")}>
            <Input
              label="전화번호"
              type="tel"
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
            <label htmlFor="address" className={cx("label")}>
              선호 지역
            </label>
            <Dropdown
              options={LOCATIONS}
              id="address"
              onChange={(value) => {
                setValue("address", value);
              }}
              init={initAddress}
            />
          </section>
        </div>
        <section className={cx("textarea-section")}>
          <Input
            label="소개"
            type="text"
            id="introduction"
            register={register("bio", { required: true })}
            isTextArea={true}
          />
        </section>
        <div className={cx("button-section")}>
          <div className={cx("button-wrapper")}>
            <Button btnColorType="orange">저장</Button>
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
    </div>
  );
}

export default ProfileEdit;
