import React, { useRef, useEffect } from "react";
import styles from "./NotificationModal.module.scss";
import Image from "next/image";
import Notification from "./Notification";
import extractNotificationInfo from "../../utils/extractNotificationInfo";
import { NotificationItem } from "./types/NotificationModal.types";
import closeIcon from "@/public/image/close_icon.svg";
import { MOBILE } from "@/constants/constants";
import useResize from "@/hooks/useResize";

interface NotificationModalProps {
  isModalOpen: boolean;
  notificationList: NotificationItem[];
  onClick: () => void;
}

export default function NotificationModal({
  isModalOpen,
  notificationList,
  onClick,
}: NotificationModalProps) {
  const isMobile = useResize(MOBILE);
  const notifications = extractNotificationInfo(notificationList);

  const notiModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (notiModalRef.current && !notiModalRef.current.contains(event.target as Node)) {
        onClick();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, onClick]);

  return (
    isModalOpen && (
      <div className={styles.wrapper} ref={notiModalRef}>
        <div className={styles.container}>
          <span className={styles.title}>{`알림 ${notificationList.length}개`}</span>
          {isMobile && (
            <Image
              width={24}
              height={24}
              className={styles.styledCloseIcon}
              src={closeIcon}
              alt="close_icon"
              onClick={onClick}
            />
          )}
        </div>
        {notificationList.length ? (
          notifications.map((notification, index) => <Notification key={index} {...notification} />)
        ) : (
          <span className={styles.no_noti}>알림이 없습니다.</span>
        )}
      </div>
    )
  );
}
