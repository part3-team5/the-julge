import { useCallback, useEffect, useState } from "react";

import Application from "@/components/UserApplication";
import ProfileEdit from "@/components/Profile/ProfileEdit";
import ProfileEmpty from "@/components/Profile/ProfileEmpty";
import ProfileForm from "@/components/Profile/ProfileForm";
import ProfileView from "@/components/Profile/ProfileView";
import { ProfileData } from "@/components/Profile/Profile.types";
import { instance } from "@/utils/instance";
import { getUserId } from "@/utils/jwt";

function Profile() {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const userId = getUserId();

  const getProfileData = useCallback(async () => {
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
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
      ) : isEditing ? (
        <ProfileEdit onClose={handleCloseEdit} onSubmit={getProfileData} />
      ) : isProfileFilled ? (
        <>
          <ProfileView onEdit={handleEditClick} />
          <Application />
        </>
      ) : (
        <ProfileEmpty onClick={handleProfileButtonClick} />
      )}
    </>
  );
}

export default Profile;
