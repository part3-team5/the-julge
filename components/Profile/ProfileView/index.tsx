// ProfileView.tsx
import { useState, useEffect } from "react";
import { instance } from "@/utils/utils";

function ProfileView({ userId }: { userId: string }) {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await instance.get(`/users/${userId}`);
        setProfileData(response.data.item);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>이름: {profileData.name}</div>
      <div>전화 번호: {profileData.phone}</div>
      <div>선호 지역: {profileData.address}</div>
      <div>소개: {profileData.bio}</div>
    </div>
  );
}

export default ProfileView;
