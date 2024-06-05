import Modal from "@/components/Modal";
import styles from "./DetailedOwnerNotice.module.scss";
import classNames from "classnames/bind";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/Button";

const cx = classNames.bind(styles);

const DetailedOwnerNotice = () => {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal({
      modalType: "alert",
      content: "안녕",
      btnName: ["확인"],
    });
  };

  const handleOpenModal2 = () => {
    openModal({
      modalType: "select",
      content: "선택하세요.",
      btnName: ["아니오", "선택하기"],
      callBackFnc: handleModalButtonFnc,
    });
  };

  const handleOpenModal3 = () => {
    openModal({
      modalType: "warning",
      content: "경고창입니다",
      btnName: ["확인"],
    });
  };

  const handleModalButtonFnc = () => {
    alert("선택되었습니다.");
    closeModal();
  };

  return (
    <>
      <div className={cx("content-wrap")}>
        <section className={cx("notice")}>
          <Button btnColorType="orange" onClick={handleOpenModal}>
            모달창 열기
          </Button>
          <Button btnColorType="orange" onClick={handleOpenModal2}>
            모달창 열기2
          </Button>
          <Button btnColorType="orange" onClick={handleOpenModal3}>
            모달창 열기3
          </Button>
        </section>

        <section className={cx("recentlt-viewed")}></section>
      </div>
    </>
  );
};

export default DetailedOwnerNotice;
