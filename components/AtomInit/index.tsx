import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { employerAtom } from "@/atoms/employerAtom";
import { profileAtom } from "@/atoms/profileAtom";
import jwt from "jsonwebtoken";
import { fetchUserInfo } from "@/api/myShop";

interface DecodedToken {
  userId: string;
  exp?: number;
  iat?: number;
}

interface UserInitializerProps {
  onInitialized: () => void;
}

const UserInitializer: React.FC<UserInitializerProps> = ({ onInitialized }) => {
  const setProfile = useSetRecoilState(profileAtom);
  const setEmployer = useSetRecoilState(employerAtom);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUserToken(token);
    } else {
      onInitialized(); // 토큰이 없는 경우 즉시 초기화 완료 콜백 호출
    }
  }, [onInitialized]);

  function decodeToken(token: string): DecodedToken | null {
    try {
      const decoded = jwt.decode(token) as DecodedToken;
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  function getUserId(token: string): string | null {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      return decodedToken.userId;
    }
    return null;
  }

  useEffect(() => {
    const fetchData = async (token: string) => {
      const userId = getUserId(token);
      if (userId) {
        const userInfo = await fetchUserInfo(userId);

        if (userInfo) {
          switch (userInfo.item.type) {
            case "employer":
              const shopId = userInfo.item.shop?.item.id;
              const name = userInfo.item.shop?.item.name;
              const category = userInfo.item.shop?.item.category;
              const address1 = userInfo.item.shop?.item.address1;
              const address2 = userInfo.item.shop?.item.address2;
              const description = userInfo.item.shop?.item.description;
              const imageUrl = userInfo.item.shop?.item.imageUrl;
              const originalHourlyPay =
                userInfo.item.shop?.item.originalHourlyPay;
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
              break;
            case "employee":
              setProfile({
                name: userInfo.item.name,
                phoneNumber: userInfo.item.phone,
                area: userInfo.item.address,
                bio: userInfo.item.bio,
              });
          }
        }
      }
      onInitialized(); // 데이터를 불러오고 초기화 완료 콜백 호출
    };

    if (userToken) {
      fetchData(userToken);
    }
  }, [userToken, setEmployer, setProfile, onInitialized]);

  return null;
};

export default UserInitializer;
