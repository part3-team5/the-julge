import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { employerAtom } from "@/atoms/employerAtom";
import ShopEmpty from "@/components/Shop/ShopEmpty";
import ShopForm from "@/components/Shop/ShopForm";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "@/constants/constants";
import ShopView from "@/components/Shop/ShopView";
import ShopEdit from "@/components/Shop/ShopEdit";

const fetchUserInfo = async (token: string, userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    return null;
  }
};

const MyShop = () => {
  const [showShopForm, setShowShopForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [employer, setEmployer] = useRecoilState(employerAtom);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      fetchUserInfo(token, userId).then((userInfo) => {
        if (userInfo) {
          const shopId = userInfo.item.shop?.item.id;
          const address1 = userInfo.item.shop?.item.address1;
          setEmployer({
            id: userInfo.item.id,
            email: userInfo.item.email,
            type: userInfo.item.type,
            shopId: shopId,
            address1: address1,
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
