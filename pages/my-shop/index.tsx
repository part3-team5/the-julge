import { useRecoilState } from "recoil";
import { employerAtom } from "@/atoms/employerAtom";
import ShopEmpty from "@/components/Shop/ShopEmpty";
import ShopForm from "@/components/Shop/ShopForm";
import { useState } from "react";
import ShopView from "@/components/Shop/ShopView";
import ShopEdit from "@/components/Shop/ShopEdit";

const MyShop = () => {
  const [showShopForm, setShowShopForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [employer] = useRecoilState(employerAtom);

  const isShopRegistered = employer.shopId;

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
