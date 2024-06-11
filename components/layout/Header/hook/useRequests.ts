import axios from "axios";

const URL = "https://bootcamp-api.codeit.kr/api/0-1/the-julge";

export const getUserNotiList = async (userId: string, accessToken: string) => {
  const { data } = await axios.get(`${URL}/users/${userId}/alerts`, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });

  return data;
};
