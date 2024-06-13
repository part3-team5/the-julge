import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { employerAtom } from "@/atoms/employerAtom";
import ShopEmpty from "@/components/Shop/ShopEmpty";
import ShopForm from "@/components/Shop/ShopForm";
import { useState } from "react";
import ShopView from "@/components/Shop/ShopView";
import ShopEdit from "@/components/Shop/ShopEdit";
import { fetchUserInfo } from "@/api/myShop";
import { authState } from "@/atoms/userAtom";

const MyShop = () => {
  const [showShopForm, setShowShopForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [employer, setEmployer] = useRecoilState(employerAtom);

  const isShopRegistered = employer?.shopId;

  const handleShopButtonClick = () => {
    setShowShopForm(true);
  };

  const handleCloseShopForm = () => {
    setShowShopForm(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      {showShopForm ? (
        <ShopForm onClose={handleCloseShopForm} />
      ) : isEditing ? (
        <ShopEdit onClose={handleCloseEdit} />
      ) : isShopRegistered ? (
        <ShopView onEdit={handleEditClick} />
      ) : (
        <ShopEmpty onClick={handleShopButtonClick} />
      )}
    </>
  );
};

export default MyShop;
