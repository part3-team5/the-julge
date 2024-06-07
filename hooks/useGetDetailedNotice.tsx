import { getNoticeDetailedData } from "@/api/notice";
import { INoticeData } from "@/types/NoticeDetail";
import { useState, useEffect } from "react";

export const useGetDetailedNotice = (
  shopId: string | undefined,
  noticeId: string | undefined
) => {
  const [noticeShopData, setNoticeShopData] = useState<INoticeData>({
    closed: false,
    description: "",
    hourlyPay: 0,
    id: "",
    startsAt: "",
    workhour: 0,
    shop: {
      address1: "",
      address2: "",
      category: "",
      description: "",
      id: "",
      imageUrl: "",
      name: "",
      originalHourlyPay: 0,
    },
  });

  useEffect(() => {
    if (shopId && noticeId) {
      const handleGetData = async () => {
        const data = await getNoticeDetailedData(shopId, noticeId);

        if (data) {
          const result = data.item;
          setNoticeShopData({
            closed: result.closed,
            description: result.description,
            hourlyPay: result.hourlyPay,
            id: result.id,
            startsAt: result.startsAt,
            workhour: result.workhour,
            shop: {
              address1: result.shop.item.address1,
              address2: result.shop.item.address2,
              category: result.shop.item.category,
              description: result.shop.item.description,
              id: result.shop.item.id,
              imageUrl: result.shop.item.imageUrl,
              name: result.shop.item.name,
              originalHourlyPay: result.shop.item.originalHourlyPay,
            },
          });
        }
      };

      handleGetData();
    }
  }, [shopId, noticeId]);

  return { noticeShopData };
};
