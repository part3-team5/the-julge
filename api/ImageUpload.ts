import axios from "axios";

const API_URL = "https://bootcamp-api.codeit.kr/api/0-1/the-julge/images";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzUwMWM4NC01MWYwLTRlYWYtOWFkMC0yZGJiMDdkODAxYTgiLCJpYXQiOjE3MTc1NjY3MDZ9.GlrLFPOD0YF6R0aAlCXblNpFhkLiLGOH2vchh0iI6KU";

interface ImageData {
  name: string;
  imageUrl: string | null;
}

export const uploadImage = async (imageData: ImageData) => {
  const response = await axios.post(API_URL, imageData, {
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
