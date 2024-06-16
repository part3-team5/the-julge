import { BASE_URL } from "@/constants/constants";
import axios from "axios";

export const getPresignedUrl = async (data: { name: string }) => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.post(`${BASE_URL}/images`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const uploadToS3 = async (url: string, file: File) => {
  try {
    await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  } catch (error) {
    alert("파일 업로드 실패");
    throw error;
  }
};

export const uploadImageAndGetUrl = async (file: File) => {
  try {
    const presignedUrlResponse = await getPresignedUrl({ name: file.name });
    const presignedUrl = presignedUrlResponse.item.url;

    await uploadToS3(presignedUrl, file);

    return presignedUrl.split("?")[0];
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("이미지 업로드에 실패했습니다.");
  }
};
