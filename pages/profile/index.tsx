import ProfileEmpty from "@/components/Profile/ProfileEmpty";
import ProfileForm from "@/components/Profile/ProfileForm";
import { useState } from "react";

function Profile() {
  const [showProfileForm, SetShowProfileForm] = useState(false);

  const handleProfileButtonClick = () => {
    SetShowProfileForm(true);
  };

  return (
    <>
      {showProfileForm ? (
        <ProfileForm />
      ) : (
        <ProfileEmpty onClick={handleProfileButtonClick} />
      )}
    </>
  );
}

export default Profile;
