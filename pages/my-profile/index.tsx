import Application from "@/components/Application";
import { ProfileData } from "@/components/Profile/Profile.types";
import ProfileEmpty from "@/components/Profile/ProfileEmpty";
import ProfileForm from "@/components/Profile/ProfileForm";
import ProfileView from "@/components/Profile/ProfileView";
import { instance } from "@/utils/instance";
import { useCallback, useEffect, useState } from "react";

function Profile() {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const getProfileData = useCallback(async () => {
    try {
      console.log("userId::::", userId);
      if (userId) {
        const response = await instance.get<{ item: ProfileData }>(
          `users/${userId}`
        );
        setProfileData(response.data.item);
      }
    } catch (error) {
      console.log("GET Error:", error);
    }
  }, [userId]);

  useEffect(() => {
    getProfileData();
  }, [userId, getProfileData]);

  const handleProfileButtonClick = () => {
    setShowProfileForm(true);
  };

  const handleCloseProfileForm = () => {
    setShowProfileForm(false);
  };

  const isProfileFilled =
    profileData &&
    profileData.name &&
    profileData.phone &&
    profileData.address &&
    profileData.bio;

  return (
    <>
      {showProfileForm ? (
        <ProfileForm
          onClose={handleCloseProfileForm}
          onSubmit={getProfileData}
        />
      ) : isProfileFilled ? (
        <>
          <ProfileView userId={userId} />
          <Application />
        </>
      ) : (
        <ProfileEmpty onClick={handleProfileButtonClick} />
      )}
    </>
  );
}

export default Profile;
