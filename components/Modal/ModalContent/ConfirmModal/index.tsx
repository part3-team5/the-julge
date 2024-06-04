import Button from "@/components/Button";
import styles from "./ConfirmModal.module.scss";
import classNames from "classnames/bind";
import { IModalContentProps } from "@/types/modal";
import Image from "next/image";
import modalCheck from "@/public/image/icon/modal-check.svg";
import modalBang from "@/public/image/icon/modal-bang.svg";

const cx = classNames.bind(styles);

const ConfirmModal = ({ modalData, closeFunction }: IModalContentProps) => {
  const isSelectModal = modalData.modalType === "select";

  return (
    <div className={cx("modal--wrap")}>
      <div className={cx("modal--content__wrap")}>
        <Image src={isSelectModal ? modalCheck : modalBang} alt="모달 아이콘" />
        <span className={cx("modal--content")}>{modalData.content}</span>
      </div>
      <div className={cx("modal--content__button")}>
        <Button
          btnColorType="white"
          btnCustom="modal--80"
          onClick={closeFunction}
        >
          {modalData.btnName[0]}
        </Button>
        {isSelectModal && (
          <Button
            btnColorType="orange"
            btnCustom="modal--80"
            onClick={modalData.callBackFnc}
          >
            {modalData.btnName[1]}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConfirmModal;
