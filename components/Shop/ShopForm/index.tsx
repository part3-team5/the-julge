import classNames from "classnames/bind";
import styles from "../Shop.module.scss";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { CATEGORYS, LOCATIONS } from "@/constants/constants";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Input from "@/components/Input";
import type { ShopFormProps, FormData } from "../Shop.types";
import ImageUpload from "@/components/ImageUpload";
import { ImageData } from "@/components/ImageUpload/ImageUpload.types";
import ConfirmModal from "@/components/Modal/ModalContent/AlertModal";
import { IModalProps } from "@/components/Modal/Modal.types";
import { submitShopForm } from "@/api/myShop";
import { uploadImageAndGetUrl } from "@/api/ImageUpload";

const cx = classNames.bind(styles);

const ShopForm: React.FC<ShopFormProps> = ({ onClose }) => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [modalData, setModalData] = useState<IModalProps>({
    modalType: "",
    content: "",
    btnName: [""],
  });

  const handleCloseAlert = () => {
    setShowAlert(false);
    onClose();
  };

  const handleSubmitForm = async (data: FormData) => {
    if (!imageData || !imageData.file) {
      alert("이미지를 추가해주세요.");
      setShowAlert(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("address1", data.address1);
    formData.append("address2", data.address2);
    formData.append("originalHourlyPay", data.originalHourlyPay.toString());
    formData.append("description", data.description);

    try {
      const imageUrl = await uploadImageAndGetUrl(imageData.file);
      formData.append("imageUrl", imageUrl);
    } catch (error) {
      console.error("Image upload error(ShopForm):", error);
      return;
    }

    try {
      const response = await submitShopForm(formData);
      if (response.ok) {
        setModalData({
          modalType: "alert",
          content: "등록이 완료되었습니다.",
          btnName: ["확인"],
        });
        setShowAlert(true);
      } else {
        alert("가게 정보를 제대로 입력해주세요.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={cx("container")}>
      <main className={cx("profile", "main")}>
        <div className={cx("header")}>
          <h1 className={cx("title")}>가게 정보</h1>
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
            <section className={cx("input-section")}>
              <Input
                label="가게 이름"
                type="text"
                id="name"
                register={register("name", { required: true })}
              />
            </section>
            <section className={cx("input-section")}>
              <label className={cx("label")} htmlFor="category">
                분류
              </label>
              <Dropdown
                options={CATEGORYS}
                id="category"
                onChange={(value) => {
                  setValue("category", value);
                }}
              />
            </section>
            <section className={cx("input-section")}>
              <label className={cx("label")} htmlFor="address1">
                주소
              </label>
              <Dropdown
                options={LOCATIONS}
                id="address1"
                onChange={(value) => {
                  setValue("address1", value);
                }}
              />
            </section>
            <section className={cx("input-section")}>
              <Input
                label="상세 주소"
                type="text"
                id="address2"
                register={register("address2", { required: true })}
              />
            </section>
            <section className={cx("input-section")}>
              <Input
                label="기본 시급"
                type="number"
                id="originalHourlyPay"
                register={register("originalHourlyPay", { required: true })}
              />
            </section>
          </div>
          <ImageUpload onImageSelected={setImageData} />
          <section className={cx("textarea-section")}>
            <label className={cx("label")} htmlFor="description">
              가게 설명
            </label>
            <textarea
              className={cx("textarea")}
              id="description"
              {...register("description", { required: true })}
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
            <ConfirmModal modalData={modalData} closeFunction={handleCloseAlert} />
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopForm;
