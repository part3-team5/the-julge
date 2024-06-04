import { IModalProps } from "@/types/modal";
import { modalState } from "@/utils/atom";
import { useCallback } from "react";
import { useRecoilState } from "recoil";

export const useModal = () => {
  const [modalData, setModalData] = useRecoilState(modalState);

  const closeModal = useCallback(() => {
    setModalData((prev) => {
      return {
        ...prev,
        isOpen: false,
      };
    });
  }, [setModalData]);

  const openModal = useCallback(
    ({ modalType, content, btnName, callBackFnc }: IModalProps) => {
      setModalData({
        isOpen: true,
        modalType: modalType,
        content: content,
        btnName: [...btnName],
        callBackFnc: callBackFnc,
      });
    },
    [setModalData]
  );

  return { modalData, openModal, closeModal };
};
