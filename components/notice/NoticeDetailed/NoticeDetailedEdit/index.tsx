import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import classNames from "classnames/bind";
import ConfirmModal from "@/components/Modal/ModalContent/AlertModal";
import Input from "@/components/Input";
import styles from "@/components/Shop/ShopNotice/ShopNoticeForm/ShopNoticeForm.module.scss";
import { IModalProps } from "@/components/Modal/Modal.types";
import { instance } from "@/utils/instance";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  NoticeData,
  NoticeFormData,
  NoticeFormProps,
} from "@/components/Shop/ShopNotice/ShopNotice.types";
import { employerAtom } from "@/atoms/employerAtom";
import { useRouter } from "next/router";
import Image from "next/image";

const cx = classNames.bind(styles);

function NoticeDetailedEdit({
  onClose,
  onSubmit,
  noticeId,
  shopId,
}: NoticeFormProps & { noticeId: string; shopId: string }) {
  const router = useRouter();
  const shopValue = useRecoilValue(employerAtom);
  const { register, handleSubmit, setValue } = useForm<NoticeFormData>();

  const [showAlert, setShowAlert] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalData, setModalData] = useState<IModalProps>({
    modalType: "",
    content: "",
    btnName: [""],
  });

  useEffect(() => {
    const getNoticeData = async () => {
      if (noticeId) {
        const response = await instance.get<{ item: NoticeFormData }>(
          `shops/${shopId}/notices/${noticeId}`
        );
        const noticeDataValue = response.data.item;
        setValue("hourlyPay", noticeDataValue.hourlyPay);
        setValue("startsAt", noticeDataValue.startsAt);
        setValue("workhour", noticeDataValue.workhour);
        setValue("description", noticeDataValue.description);
      }
    };
    getNoticeData();
  }, [noticeId, shopId, setValue]);

  const handleCloseAlert = () => {
    setShowAlert(false);
    if (modalType === "confirm") {
      onClose();
    }
  };

  const handleSubmitForm = async (data: NoticeFormData) => {
    const startsAtDate = new Date(data.startsAt);
    const formattedStartsAt = startsAtDate.toISOString();

    const body: NoticeData = {
      hourlyPay: parseInt(data.hourlyPay),
      startsAt: formattedStartsAt,
      workhour: parseInt(data.workhour),
      description: data.description,
    };

    try {
      const response = await instance.put(
        `shops/${shopId}/notices/${noticeId}`,
        body
      );
      if (response.status === 200) {
        setModalData({
          modalType: "alert",
          content: "공고 수정이 완료되었습니다.",
          btnName: ["확인"],
        });
        setShowAlert(true);
        onSubmit();
        setModalType("alert");
      } else {
        setModalData({
          modalType: "alert",
          content: "공고 정보를 제대로 입력해주세요.",
          btnName: ["확인"],
        });
        setModalType("alert");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("에러", error);
    }
  };

  return (
    <main className={cx(["notice"], ["main"])}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>공고 편집</h1>
        <Image
          src="/image/icon/shop_close.svg"
          width={32}
          height={32}
          alt="close button"
          onClick={onClose}
          className={cx("close-button")}
        />
      </div>
      <form className={cx("form")} onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={cx("input-wrapper")}>
          <section className={cx("input__section")}>
            <Input
              label="시급"
              type="number"
              id="hourlyPay"
              register={register("hourlyPay", { required: true })}
              suffix="원"
            />
          </section>
          <section className={cx("input__section")}>
            <Input
              label="시작 일시"
              type="datetime-local"
              id="startsAt"
              register={register("startsAt", {
                required: true,
              })}
            />
          </section>
          <section className={cx("input-section")}>
            <Input
              label="업무 시간"
              type="number"
              id="workhour"
              register={register("workhour", {
                required: true,
              })}
              suffix="시간"
            />
          </section>
        </div>
        <section className={cx("textarea-section")}>
          <Input
            label="공고 설명"
            type="text"
            id="description"
            register={register("description", { required: true })}
            isTextArea={true}
          />
        </section>
        <div className={cx("button-section")}>
          <div className={cx("button-wrapper")}>
            <Button btnColorType="orange">등록하기</Button>
          </div>
        </div>
      </form>
      {showAlert && (
        <div className={cx("overlay")}>
          <ConfirmModal
            modalData={modalData}
            closeFunction={handleCloseAlert}
          />
        </div>
      )}
    </main>
  );
}

export default NoticeDetailedEdit;
