import axios from "axios";
import { BASE_URL } from "@/constants/constants";

export const fetchNoticeList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/notices`);
    return response.data.items.map((notice: any) => ({
      id: notice.item.id,
      hourlyPay: notice.item.hourlyPay,
      startsAt: notice.item.startsAt,
      workhour: notice.item.workhour,
      description: notice.item.description,
      closed: notice.item.closed,
      shop: {
        item: {
          id: notice.item.shop.item.id,
          name: notice.item.shop.item.name,
          category: notice.item.shop.item.category,
          address1: notice.item.shop.item.address1,
          address2: notice.item.shop.item.address2,
          description: notice.item.shop.item.description,
          imageUrl: notice.item.shop.item.imageUrl,
          originalHourlyPay: notice.item.shop.item.originalHourlyPay,
        },
      },
    }));
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
