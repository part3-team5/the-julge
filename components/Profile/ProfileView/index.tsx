import { useRecoilValue } from "recoil";
import { profileDataState } from "../ProfileForm/atoms";

function ProfileView() {
  const profileData = useRecoilValue(profileDataState);
  if (!profileData) {
    return <div>No ProfileData</div>;
  }
  return (
    <div>
      <div>내 프로필</div>
      <div>이름 : {profileData.name}</div>
      <div>전화 번호 : {profileData.phone}</div>
      <div>선호 지역 : {profileData.address}</div>
      <div>소개 : {profileData.bio}</div>
    </div>
  );
}

export default ProfileView;
