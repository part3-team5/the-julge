import { useMutation } from "react-query";
import { ClearNotification } from "./userNotiRequest";

export function useClearNotification(id: string, alertId: string, jwt: string) {
  return useMutation(() => ClearNotification(id, alertId, jwt));
}
