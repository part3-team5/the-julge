import { BASE_URL } from "@/constants/url";
import axios from "axios";

export const getNoticeDetailedData = async (
  shopId: string,
  noticeId: string
) => {
  let res;

  try {
    res = await axios.get(`${BASE_URL}/shops/${shopId}/notices/${noticeId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error);
    }
  }

  return res?.data;
};
