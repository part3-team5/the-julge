// 스웨거에서 공고 등록이 안되어서 임시로 만든 파일
import React from "react";

const PostNotice = () => {
  const postNotice = async () => {
    const url = `https://bootcamp-api.codeit.kr/api/0-1/the-julge/shops/b07b2624-20d3-4a40-9bb3-f8dc82c66f0a/notices`;

    const accessToken = localStorage.getItem("accessToken");
    const data = {
      hourlyPay: 20000,
      startsAt: "2024-08-30T00:00:00Z",
      workhour: 5,
      description: "맛집이라고 헛소문나서 인기가 많아질 예정입니다... 많은 지원 부탁",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
