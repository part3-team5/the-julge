import ProfileEmpty from "@/components/Profile/ProfileEmpty";
import ProfileForm from "@/components/Profile/ProfileForm";
import { useState } from "react";

function Profile() {
  const [showProfileForm, SetShowProfileForm] = useState(false);

  const handleProfileButtonClick = () => {
    SetShowProfileForm(true);
  };

  const handleCloseProfileForm = () => {
    SetShowProfileForm(false);
  };

  return (
    <>
      {showProfileForm ? (
        <ProfileForm onClose={handleCloseProfileForm} />
      ) : (
        <ProfileEmpty onClick={handleProfileButtonClick} />
      )}
    </>
  );
}

export default Profile;
