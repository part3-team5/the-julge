import { useQuery } from "react-query";
import { getUserNotiList } from "./useRequests";

export const useNoticesData = (userId: string, accessToken: string) => {
  return useQuery(
    ["notices", userId, accessToken],
    () => getUserNotiList(userId, accessToken),
    {
      enabled: !!userId,
    }
  );
};
