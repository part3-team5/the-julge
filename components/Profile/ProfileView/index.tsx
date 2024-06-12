import { useState, useEffect } from "react";
import { instance } from "@/utils/instance";
import styles from "./ProfileView.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { ProfileData, ProfileViewProps } from "../Profile.types";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";

const cx = classNames.bind(styles);

function ProfileView({ userId, onEdit }: ProfileViewProps) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await instance.get(`/users/${userId}`);
        setProfileData(response.data.item);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    getProfileData();
  }, [userId]);

  if (!profileData) {
    return (
      <div className={cx("loading")}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={cx("profile")}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>내 프로필</h1>
      </div>
      <div className={cx("info-wrapper")}>
        <div className={cx("info")}>
          <div className={cx("details")}>
            <div className={cx("detail-name")}>
              <p className={cx("name")}>이름</p>
              <h2 className={cx("my-name")}>{profileData.name}</h2>
            </div>
            <div className={cx("detail")}>
              <Image
                width={20}
                height={20}
                src="/image/icon/phone.svg"
                alt="휴대폰 아이콘"
              />
              <p>{profileData.phone}</p>
            </div>
            <div className={cx("detail")}>
              <Image
                width={20}
                height={20}
                src="/image/icon/location.svg"
                alt="위치 아이콘"
              />
              <p>선호 지역: {profileData.address}</p>
            </div>
          </div>
          <div className={cx("bio-wrapper")}>
            <p className={cx("bio")}>{profileData.bio}</p>
          </div>
        </div>
        <div className={cx("button-wrapper")}>
          <Button btnColorType="white" onClick={onEdit}>
            편집하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
