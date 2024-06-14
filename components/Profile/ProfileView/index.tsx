import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./ProfileView.module.scss";
import { ProfileData, ProfileViewProps } from "../Profile.types";
import Button from "@/components/Button";
import { useRecoilValue } from "recoil";
import { profileAtom } from "@/atoms/profileAtom";

const cx = classNames.bind(styles);

function ProfileView({ onEdit }: ProfileViewProps) {
  const profileData = useRecoilValue(profileAtom);

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
              <p>선호 지역: {profileData.area}</p>
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
