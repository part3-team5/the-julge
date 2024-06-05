import classNames from "classnames/bind";
import styles from "../Profile.module.scss";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import jwt from "jsonwebtoken";
import { BASE_URL, locations } from "@/constants/constants";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Input from "@/components/Input";
import api from "@/api/api";
import { profileDataState } from "./atoms";
import { ProfileData } from "../Profile.types";

const cx = classNames.bind(styles);

function ProfileForm() {
  const { register, handleSubmit } = useForm();
  const setProfileData = useSetRecoilState(profileDataState);

  const updateUserProfile = async (
    userId: string,
    profileData: ProfileData
  ) => {
    try {
      const response = await api.put(
        `${BASE_URL}/users/${userId}`,
        profileData
      );
      return response.data;
    } catch (error) {
      console.log("PUT Response에러:", error);
      throw error;
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        throw new Error("No Token!!!");
      }
      const decodeToken: any = jwt.decode(token);
      const userId = decodeToken.userId;

      const profileData = {
        name: data.name,
        phone: data.phoneNumber,
        address: data.locations,
        bio: data.bio,
      };

      const res = await updateUserProfile(userId, profileData);
      const updateLink = res.links.find((link: any) => link.rel === "update");
      if (updateLink) {
        setProfileData(res.data.links);
        console.log(profileData);
      } else {
        throw new Error("업데이트 링크 못 찾음.");
      }
    } catch (error) {
      console.log("Profile Update Error: ", error);
    }
  };

  return (
    <main className={cx(["profile"], ["main"])}>
      <h1 className={cx("title")}>내 프로필</h1>
      <form className={cx("form")} onSubmit={handleSubmit(handleFormSubmit)}>
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
            <Dropdown options={locations} id="locations" />
          </section>
        </div>
        <section className={cx("textarea-section")}>
          <label className={cx("label")} htmlFor="bio">
            소개
          </label>
          <textarea className={cx("textarea")} id="bio" />
        </section>
        <div className={cx("button-section")}>
          <div className={cx("button-wrapper")}>
            <Button btnColorType="orange">프로필 등록</Button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default ProfileForm;
