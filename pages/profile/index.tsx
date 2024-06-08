import Application from "@/components/Application";
import { ProfileData } from "@/components/Profile/Profile.types";
import ProfileEmpty from "@/components/Profile/ProfileEmpty";
import ProfileForm from "@/components/Profile/ProfileForm";
import ProfileView from "@/components/Profile/ProfileView";
import { instance } from "@/utils/instance";
import { useEffect, useState } from "react";

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
  const fetchProfileData = async () => {
    try {
      if (userId) {
        const response = await instance.get<{ item: ProfileData }>(
          `users/${userId}`
        );
        setProfileData(response.data.item);
      }
    } catch (error) {
      console.log("GET Error:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [userId]);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        if (userId) {
          const response = await instance.get<{ item: ProfileData }>(
            `users/${userId}`
          );
          setProfileData(response.data.item);
        }
      } catch (error) {
        console.log("GET Error :", error);
      }
    };
    getProfileData();
  }, [userId]);

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
          onSubmit={fetchProfileData}
        />
      ) : isProfileFilled ? (
        <ProfileView userId={userId} />
      ) : (
        <ProfileEmpty onClick={handleProfileButtonClick} />
      )}
      <Application />
    </>
  );
}

export default Profile;
