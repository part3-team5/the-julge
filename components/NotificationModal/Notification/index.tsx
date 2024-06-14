import React from "react";
import styles from "./Notification.module.scss";
import type { Notification } from "../types/NotificationModal.types";
import useCookie from "@/hooks/useCookies";
import { useClearNotification } from "../../../hooks/useNotiUserQuery";

export default function Notification({
  alertId,
  name,
  result,
  elapsedTime,
  formattedTime,
}: Notification) {
  const { id, jwt } = useCookie();
  const mutation = useClearNotification(id, alertId, jwt);

  const handleDeleteNotification = () => {
    mutation.mutate();
  };

  return (
    <div className={styles.wrapper} onClick={handleDeleteNotification}>
      <div className={styles.container}>
        <div
          className={styles.circle}
          style={{
            background:
              result === "accepted"
                ? "var(--blue20, #0080FF)"
                : "var(--red30, #EC5A46)",
          }}
        ></div>
        <div className={styles.notifiText}>
          {name} ({formattedTime}) 공고 지원이{" "}
          <span
            className={styles.result}
            style={{
              color: result === "accepted" ? "var(--blue20)" : "var(--red30)",
            }}
          >
            {result === "accepted" ? "승인" : "거절"}
          </span>{" "}
          되었어요.
        </div>
      </div>
      <span className={styles.elapsedTime}>{elapsedTime}</span>
    </div>
  );
}
