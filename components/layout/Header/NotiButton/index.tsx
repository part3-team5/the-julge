import React, { useState } from "react";
import NotificationModal from "@/components/NotificationModal";
import useCookie from "@/hooks/useCookies";
import Image from "next/image";
import { useNoticesData } from "@/hooks/useUserQuery";
import styles from "./NotiButtons.module.scss";

export default function NotiButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { jwt, id } = useCookie();
  const response = useNoticesData(id, jwt);

  const responseList = response?.data?.items ?? [];

  const notificationList = responseList.filter(
    (item: { item: { read: boolean } }) => item.item.read === false
  );

  const activeStatus = notificationList.length > 0 ? "active" : "inactive";

  const handleClickNoti = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <button className={styles.button} type="button">
      <Image
        priority
        src={`/image/notification-${activeStatus}.svg`}
        alt="notification"
        width={20}
        height={20}
        onClick={handleClickNoti}
      />
      {isModalOpen && (
        <NotificationModal
          isModalOpen={isModalOpen}
          notificationList={notificationList}
          onClick={handleClickNoti}
        />
      )}
    </button>
  );
}
