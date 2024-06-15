import { BASE_URL } from "@/constants/constants";
import axios from "axios";

export const getUserNotiList = async (userId: string, accessToken: string) => {
  const { data } = await axios.get(`${BASE_URL}/users/${userId}/alerts`, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });

  return data;
};

export const getMyApplicationList = async (userId: string) => {
  const accessToken = localStorage.getItem("accessToken");
  const { data } = await axios.get(`${BASE_URL}/users/${userId}/applications`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
