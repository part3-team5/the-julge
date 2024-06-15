import Button from "@/components/Button";
import styles from "./AlertModal.module.scss";
import classNames from "classnames/bind";
import { IModalContentProps } from "@/components/Modal/Modal.types";
import useModalScrollBlock from "@/hooks/useModalScrollBlock";

const cx = classNames.bind(styles);

const ConfirmModal = ({ modalData, closeFunction }: IModalContentProps) => {
  useModalScrollBlock();

  const handleClick = async () => {
    closeFunction();
    if (modalData.callBackFnc) {
      await modalData.callBackFnc();
    }
  };

  return (
    <div className={cx("modal--wrap")}>
      <span className={cx("modal--content")}>{modalData.content}</span>
      <div className={cx("modal--content__button")}>
        <Button
          btnColorType="orange"
          btnCustom="modal--120"
          onClick={handleClick}
        >
          {modalData.btnName[0]}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
