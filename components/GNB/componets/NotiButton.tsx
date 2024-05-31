import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";

export default function NotiButton({ activeStatus }: { activeStatus: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickNoti = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <button type="button" onClick={handleClickNoti}>
        <Image
          src={`/image/notification-${activeStatus}.svg`}
          alt="notification"
          width={20}
          height={20}
        />
      </button>
      {isModalOpen && <ModalContainer></ModalContainer>}
    </>
  );
}

const ModalContainer = styled.div`
  position: absolute;
  z-index: 1000;
  top: +50px;
  right: 350px;
  height: 200px;
  width: 368px;
  padding: 0 20px 24px;
  overflow-y: auto;
  border: 1px solid var(--The-julge-gray-30);
  border-radius: 10px;
  background-color: var(--The-julge-purple-10);
  box-shadow: 0 2px 8px 0 rgb(120 116 134 / 25%);
`;
