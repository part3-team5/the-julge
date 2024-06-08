// 스웨거에서 공고 등록이 안되어서 임시로 만든 파일
import React from "react";

const PostNotice: React.FC = () => {
  const postNotice = async () => {
    const url =
      "https://bootcamp-api.codeit.kr/api/0-1/the-julge/shops/dbb3e149-b8a6-4803-a7c3-c3a862f0eca1/notices";

    const accessToken = localStorage.getItem("accessToken");
    const data = {
      hourlyPay: 999999999,
      startsAt: "2024-07-30T00:00:00Z",
      workhour: 5,
      description: "하기 싫어요..",
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
