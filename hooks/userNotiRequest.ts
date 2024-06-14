import axios from "axios";
import { BASE_URL } from "@/constants/constants";

export const ClearNotification = async (
  id: string,
  alertId: string,
  jwt: string
) => {
  try {
    await axios.put(
      `${BASE_URL}/users/${id}/alerts/${alertId}`,
      {},
      {
        headers: {
          Authorization: `${jwt}`,
        },
      }
    );

    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response ? error.response.status : null;
      switch (status) {
        case 400:
          throw new Error("잘못된 요청입니다. 요청 형식을 확인해 주세요.");
        case 403:
          throw new Error("접근이 거부되었습니다. 권한을 확인해 주세요.");
        case 404:
          throw new Error(
            "요청한 리소스를 찾을 수 없습니다. URL을 확인해 주세요."
          );
        default:
          throw new Error("알 수 없는 에러가 발생했습니다.");
      }
    } else {
      throw new Error("네트워크 오류가 발생했습니다.");
    }
  }
};
