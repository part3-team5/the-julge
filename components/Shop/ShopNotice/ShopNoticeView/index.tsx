import React from "react";
import { ShopNoticeViewProps } from "../ShopNotice.types";

function ShopNoticeView({ noticeData }: ShopNoticeViewProps) {
  return (
    <div>
      <h2>공고 정보</h2>
      {noticeData ? (
        <div>
          <p>시급: {noticeData.hourlyPay}원</p>
          <p>시작 일시: {noticeData.startsAt}</p>
          <p>업무 시간: {noticeData.workhour}시간</p>
          <p>공고 설명: {noticeData.description}</p>
        </div>
      ) : (
        <p>공고 정보가 없습니다.</p>
      )}
    </div>
  );
}

export default ShopNoticeView;
