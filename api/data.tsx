// 스웨거에서 공고 등록이 안되어서 임시로 만든 파일
import React from "react";

const PostNotice: React.FC = () => {
  const postNotice = async () => {
    const url =
      "https://bootcamp-api.codeit.kr/api/0-1/the-julge/shops/bf99042f-4735-443e-ae11-813d1868d45e/notices";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzUwMWM4NC01MWYwLTRlYWYtOWFkMC0yZGJiMDdkODAxYTgiLCJpYXQiOjE3MTc1NjY3MDZ9.GlrLFPOD0YF6R0aAlCXblNpFhkLiLGOH2vchh0iI6KU";
    const data = {
      hourlyPay: 999999999,
      startsAt: "2024-06-06T00:00:00Z",
      workhour: 5,
      description: "맛집이라고 헛소문나서 손님 많음 ㅜㅜ;;",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={postNotice}>Post Notice</button>
    </div>
  );
};

export default PostNotice;
