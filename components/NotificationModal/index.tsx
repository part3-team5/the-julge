import React from "react";
import styles from "./NotificationModal.module.scss";
import Image from "next/image";
import Notification from "./Notification";
import extractNotificationInfo from "../../utils/extractNotificationInfo";
import { NotificationItem } from "./types/NotificationModal.types";
import closeIcon from "@/public/image/close_icon.svg";

interface NotificationModalProps {
  handleClickNoti: () => void;
  isModalOpen: boolean;
  notificationList: NotificationItem[];
}

export default function NotificationModal({
  handleClickNoti,
  isModalOpen,
  notificationList,
}: NotificationModalProps) {
  const notifications = extractNotificationInfo(notificationList);

  return (
    isModalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <span
            className={styles.title}
          >{`알림 ${notificationList.length}개`}</span>
          <Image
            className={styles.styledCloseIcon}
            src={closeIcon}
            alt="close_icon"
            onClick={handleClickNoti}
          />
        </div>
        {notificationList.length ? (
          notifications.map((notification, index) => (
            <Notification key={index} {...notification} />
          ))
        ) : (
          <div className={styles.alertDiv}>알림이 없습니다.</div>
        )}
      </div>
    )
  );
}
