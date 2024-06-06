import React, { useState } from "react";
import Image from "next/image";
import styles from "./NotiButtons.module.scss";

export default function NotiButton({ activeStatus }: { activeStatus: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickNoti = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button
        className={styles.notiButton}
        type="button"
        onClick={handleClickNoti}
      >
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
