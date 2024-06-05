import axios from "axios";
import { BASE_URL } from "@/constants/constants";
import { NoticeItem } from "@/types/types";

interface ApiResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: { item: NoticeItem }[];
  links: { rel: string; href: string }[];
}

const fetchNotices = async (
  offset = 0,
  limit = 50,
  allNotices: NoticeItem[] = []
): Promise<NoticeItem[]> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${BASE_URL}/notices?offset=${offset}&limit=${limit}`
    );
    const notices = response.data.items.map((notice) => notice.item);

    allNotices = allNotices.concat(notices);

    if (response.data.hasNext) {
      return fetchNotices(offset + limit, limit, allNotices);
    } else {
      return allNotices;
    }
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const fetchNoticeList = async (): Promise<NoticeItem[]> => {
  return fetchNotices();
};
