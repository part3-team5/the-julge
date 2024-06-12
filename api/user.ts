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
