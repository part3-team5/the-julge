import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
import { useModal } from "@/hooks/useModal";
import AlertModal from "./ModalContent/AlertModal";
import ConfirmModal from "./ModalContent/ConfirmModal";

const cx = classNames.bind(styles);

const Modal = () => {
  const { modalData, closeModal } = useModal();

  return (
    <>
      {modalData.isOpen && (
        <div className={cx("modal--background")}>
          {modalData.modalType === "alert" && (
            <AlertModal modalData={modalData} closeFunction={closeModal} />
          )}
          {["select", "warning"].includes(modalData.modalType) && (
            <ConfirmModal modalData={modalData} closeFunction={closeModal} />
          )}
        </div>
      )}
    </>
  );
};

export default Modal;
