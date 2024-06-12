import { useEffect, useState } from "react";
import { instance } from "@/utils/instance";
import { ProfileData, ProfileFormProps } from "../Profile.types";
import Button from "@/components/Button";
import Input from "@/components/Input";
import classNames from "classnames/bind";
import styles from "../Profile.module.scss";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import { LOCATIONS } from "@/constants/constants";
import Spinner from "@/components/Spinner";
import { useForm } from "react-hook-form";
import { IModalProps } from "@/components/Modal/Modal.types";
import ConfirmModal from "@/components/Modal/ModalContent/AlertModal";

const cx = classNames.bind(styles);

function ProfileEdit({ onClose, onSubmit }: ProfileFormProps) {
  const userId = localStorage.getItem("userId");
  const { register, handleSubmit, setValue } = useForm<ProfileData>();

  const [initAddress, setInitAddress] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [modalData, setModalData] = useState<IModalProps>({
    modalType: "",
    content: "",
    btnName: [""],
  });

  useEffect(() => {
    const getProfileData = async () => {
      try {
        if (userId) {
          const response = await instance.get<{ item: ProfileData }>(
            `/users/${userId}`
          );
          // setProfileData(response.data.item);
          setValue("name", response.data.item.name);
          setValue("phone", response.data.item.phone);
          setValue("address", response.data.item.address);
          setValue("bio", response.data.item.bio);

          setInitAddress(response.data.item.address);
        }
      } catch (error) {
        console.error("Get Error :", error);
      }
    };
    getProfileData();
  }, [userId, setValue]);

  const handleCloseAlert = () => {
    setShowAlert(false);
    onClose();
  };

  const handleSubmitForm = async (data: ProfileData) => {
    try {
      const response = await instance.put(`/users/${userId}`, data);
      if (response.status === 200) {
        setModalData({
          modalType: "alert",
          content: "프로필 수정이 완료되었습니다.",
          btnName: ["확인"],
        });
        setShowAlert(true);
        onSubmit();
      } else {
        alert("프로필 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to update profile data:", error);
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
              register={register("name", { required: true })}
            />
          </section>
          <section className={cx("input-section")}>
            <Input
              label="전화번호"
              type="tel"
              register={register("phone", {
                required: true,
                pattern: /^\d{3}-\d{3,4}-\d{4}$/,
              })}
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
