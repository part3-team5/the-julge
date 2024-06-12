import { BASE_URL } from "@/constants/constants";
import axios from "axios";

export const getNoticeDetailedData = async (shopId: string, noticeId: string) => {
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

export const getApplicantList = async (shopId: string, noticeId: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/shops/${shopId}/notices/${noticeId}/applications?limit=100`
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert("데이터를 가져오는 중 오류가 발생했습니다.");
    }
    throw error;
  }
};

export const postApplicant = async (shopId: string, noticeId: string) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const res = await axios.post(
      `${BASE_URL}/shops/${shopId}/notices/${noticeId}/applications`,
      {
        status: "pending",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error);
    }
  }
};

export const putApplicationStatus = async (status: string, idObj: { [key: string]: string }) => {
  const accessToken = localStorage.getItem("accessToken");
  let res;

  try {
    res = await axios.put(
      `${BASE_URL}/shops/${idObj.shopId}/notices/${idObj.noticeId}/applications/${idObj.applicationId}`,
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error);
    }
  }
  return res;
};

export interface FormData {
  shopId: string;
}

export const getMyNoticeList = async (shopId: string, offset = 0, limit = 6) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/shops/${shopId}/notices?offset=${offset}&limit=${limit}`
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
