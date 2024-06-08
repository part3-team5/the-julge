import { BASE_URL } from "@/constants/constants";
import axios from "axios";

export const submitShopForm = async (formData: FormData) => {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(`${BASE_URL}/shops`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Shop form submission error:", error);
    throw error;
  }
};
