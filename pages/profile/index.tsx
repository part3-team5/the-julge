import ProfileEmpty from "@/components/Profile/ProfileEmpty";
import ProfileForm from "@/components/Profile/ProfileForm";
import ProfileView from "@/components/Profile/ProfileView";
import { useState } from "react";

function Profile() {
  const [showProfileForm, SetShowProfileForm] = useState(false);
  const [showProfileView, setShowProfileView] = useState(false);
  const handleProfileButtonClick = () => {
    SetShowProfileForm(true);
  };

  const handleCloseProfileForm = () => {
    SetShowProfileForm(false);
    setShowProfileView(true);
  };

  return (
    <>
      {showProfileForm ? (
        <ProfileForm onClose={handleCloseProfileForm} />
      ) : showProfileView ? (
        <ProfileView userId={localStorage.getItem("userId") || ""} />
      ) : (
        <ProfileEmpty onClick={handleProfileButtonClick} />
      )}
    </>
  );
}

export default Profile;
