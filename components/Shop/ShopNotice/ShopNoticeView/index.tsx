import React from "react";
import { ShopNoticeViewProps } from "../ShopNotice.types";
import { formatDate } from "@/utils/formatDate";

function ShopNoticeView({ noticeData }: ShopNoticeViewProps) {
  return (
    <div>
      {noticeData &&
        noticeData.items.map((itemWithLinks) => (
          <div key={itemWithLinks.item.id}>
            <p>시급: {itemWithLinks.item.hourlyPay}</p>
            <p>시작 시간: {formatDate(itemWithLinks.item.startsAt)}</p>
            <p>근무 시간: {itemWithLinks.item.workhour}</p>
            <h3>{itemWithLinks.item.description}</h3>
          </div>
        ))}
    </div>
  );
}

export default ShopNoticeView;
