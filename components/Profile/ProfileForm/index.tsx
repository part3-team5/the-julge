import classNames from "classnames/bind";
import styles from "../Profile.module.scss";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { locations } from "@/constants/constants";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { ProfileFormProps } from "../Profile.types";
import { instance } from "@/utils/utils";
import axios from "axios";
import ProfileView from "../ProfileView";

const cx = classNames.bind(styles);

const ProfileForm: React.FC<ProfileFormProps> = ({ onClose }) => {
  const { register, handleSubmit } = useForm();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmitForm = async (data: any) => {
    const body = {
      name: data.name,
      phone: data.phoneNumber,
      address: data.area,
      bio: data.introduction,
    };

    try {
      const response = await instance.put(`/users/${userId}`, body);
      if (response.status === 200) {
        onClose();
      } else alert("프로필 데이터를 제대로 입력해주세요.");
    } catch (error) {
      console.log("PUT Error:", error);
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
              register={register("name", { required: true })}
            />
          </section>
          <section className={cx("input__section")}>
            <Input
              label="전화번호"
              type="tel"
              id="phon-number"
              register={register("phoneNumber", {
                required: true,
                pattern: /^\d{3}-\d{3,4}-\d{4}$/,
              })}
            />
          </section>
          <section className={cx("input-section")}>
            <label className={cx("label")} htmlFor="locations">
              선호 지역
            </label>
            <Dropdown
              options={locations}
              id="area"
              register={register("area", { required: true })}
            />
          </section>
        </div>
        <section className={cx("textarea-section")}>
          <Input
            label="소개"
            type="text"
            id="introduction"
            register={register("introduction", { required: true })}
            isTextArea={true}
          />
        </section>
        <div className={cx("button-section")}>
          <div className={cx("button-wrapper")}>
            <Button btnColorType="orange">등록하기</Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default ProfileForm;
