import { getUserNotiList } from "@/api/user";
import { useQuery } from "react-query";

export const useNoticesData = (userId: string, accessToken: string) => {
  return useQuery(["notices", userId, accessToken], () => getUserNotiList(userId, accessToken), {
    enabled: !!userId,
  });
};
