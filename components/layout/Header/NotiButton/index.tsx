import React, { useState } from "react";
import Image from "next/image";
import styles from "./NotiButtons.module.scss";
import useCookie from "@/hooks/useCookies";
import { useNoticesData } from "../../../../hooks/useUserQuery";

export default function NotiButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { jwt, id } = useCookie();
  const result = useNoticesData(id, jwt);
  const activeStatus = result?.data?.count ? "active" : "inactive";

  const handleClickNoti = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <button className={styles.notiButton} type="button" onClick={handleClickNoti}>
        <Image
          src={`/image/notification-${activeStatus}.svg`}
          alt="notification"
          width={20}
          height={20}
        />
      </button>
      {isModalOpen && <div className={styles.modalContainer}></div>}
    </>
  );
}
