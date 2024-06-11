import { BASE_URL, BASE_API_URL } from "@/constants/url";
import { INoticeLinks } from "@/types/Notice";
import axios from "axios";

export const getNoticeDetailedData = async (
  shopId: string,
  noticeId: string
) => {
  let res;

  try {
    res = await axios.get(
      `${BASE_API_URL}/shops/${shopId}/notices/${noticeId}`
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error);
    }
  }
  return res?.data;
};

export const getApplicantList = async (shopId: string, noticeId: string) => {
  let res;

  try {
    res = await axios.get(
      `${BASE_API_URL}/shops/${shopId}/notices/${noticeId}/applications`
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error);
    }
  }
  return res?.data;
};

export const putApplicationStatus = async (
  status: string,
  idObj: { [key: string]: string }
) => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlMzFmNDkzMy1jNGJjLTQyYjItOTllMC1jNTg1OGNmMGM2NDciLCJpYXQiOjE3MTc4Mzk4Mzd9.EiuJoitWu9Onu0sp2sxkYgBWcu3DMAv1XIhsI8VBV1A";
  let res;

  try {
    res = await axios.put(
      `${BASE_API_URL}/shops/${idObj.shopId}/notices/${idObj.noticeId}/applications/${idObj.applicationId}`,
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

export const getMyNoticeList = async (
  shopId: string,
  offset = 0,
  limit = 6
) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/shops/${shopId}/notices?offset=${offset}&limit=${limit}`
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
