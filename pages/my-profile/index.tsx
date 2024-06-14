import { useState } from "react";

import Application from "@/components/UserApplication";
import ProfileEdit from "@/components/Profile/ProfileEdit";
import ProfileEmpty from "@/components/Profile/ProfileEmpty";
import ProfileForm from "@/components/Profile/ProfileForm";
import ProfileView from "@/components/Profile/ProfileView";
// import { ProfileDataProps } from "@/components/Profile/Profile.types";
// import { instance } from "@/utils/instance";
import { useRecoilValue } from "recoil";
import { profileAtom } from "@/atoms/profileAtom";

function Profile() {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const profileData = useRecoilValue(profileAtom);

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
        <ProfileForm onClose={handleCloseProfileForm} />
      ) : isEditing ? (
        <ProfileEdit onClose={handleCloseEdit} />
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
