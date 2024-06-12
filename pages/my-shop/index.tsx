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
  const userData = useRecoilValue(authState);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId = userData.user?.id;

    if (token && userId) {
      fetchUserInfo(token, userId).then((userInfo) => {
        if (userInfo) {
          const shopId = userInfo.item.shop?.item.id;
          const name = userInfo.item.shop?.item.name;
          const category = userInfo.item.shop?.item.category;
          const address1 = userInfo.item.shop?.item.address1;
          const address2 = userInfo.item.shop?.item.address2;
          const description = userInfo.item.shop?.item.description;
          const imageUrl = userInfo.item.shop?.item.imageUrl;
          const originalHourlyPay = userInfo.item.shop?.item.originalHourlyPay;
          setEmployer({
            id: userInfo.item.id,
            email: userInfo.item.email,
            type: userInfo.item.type,
            shopId: shopId,
            name: name,
            category: category,
            address1: address1,
            address2: address2,
            description: description,
            imageUrl: imageUrl,
            originalHourlyPay: originalHourlyPay,
          });
        }
      });
    } else {
      console.error("Token, User ID 정보를 확인해 주세요");
    }
  }, [setEmployer]);

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
