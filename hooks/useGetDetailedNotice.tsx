import { getNoticeDetailedData } from "@/api/notice";
import { INoticeWithShopData, INoticeLinks } from "@/types/Notice";
import { useState, useEffect } from "react";

export const useGetDetailedNotice = (
  shopId: string | undefined,
  noticeId: string | undefined
) => {
  const [noticeShopData, setNoticeShopData] = useState<INoticeWithShopData>({
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
          const resultItem = data.item;
          setNoticeShopData({
            closed: resultItem.closed,
            description: resultItem.description,
            hourlyPay: resultItem.hourlyPay,
            id: resultItem.id,
            startsAt: resultItem.startsAt,
            workhour: resultItem.workhour,
            shop: {
              address1: resultItem.shop.item.address1,
              address2: resultItem.shop.item.address2,
              category: resultItem.shop.item.category,
              description: resultItem.shop.item.description,
              id: resultItem.shop.item.id,
              imageUrl: resultItem.shop.item.imageUrl,
              name: resultItem.shop.item.name,
              originalHourlyPay: resultItem.shop.item.originalHourlyPay,
            },
          });
        }
      };

      handleGetData();
    }
  }, [shopId, noticeId]);

  return { noticeShopData };
};
