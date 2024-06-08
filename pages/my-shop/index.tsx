import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { employerAtom } from "@/atoms/employerAtom";
import ShopEmpty from "@/components/Shop/ShopEmpty";
import ShopForm from "@/components/Shop/ShopForm";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "@/constants/constants";
import ShopView from "@/components/Shop/ShopView";

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
  const [employer, setEmployer] = useRecoilState(employerAtom);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      fetchUserInfo(token, userId).then((userInfo) => {
        if (userInfo) {
          const shopId = userInfo.item?.shop?.item?.id || "";
          setEmployer({
            id: userInfo.item.id,
            email: userInfo.item.email,
            type: userInfo.item.type,
            shopId: shopId,
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

  return (
    <>
      {showShopForm ? (
        <ShopForm onClose={handleCloseShopForm} />
      ) : isShopRegistered ? (
        <ShopView onClose={handleCloseShopForm} />
      ) : (
        <ShopEmpty onClick={handleShopButtonClick} />
      )}
    </>
  );
};

export default MyShop;
