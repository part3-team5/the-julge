import { BASE_URL } from "@/constants/constants";
import axios from "axios";

export const submitShopForm = async (formData: FormData) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(`${BASE_URL}/shops`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Shop form submission error:", error);
    throw error;
  }
};

export const fetchShopData = async (shopId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/shops/${shopId}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Shop data fetching failed:", error);
    throw error;
  }
};
