import classNames from "classnames/bind";
import styles from "../Shop.module.scss";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { CATEGORYS, LOCATIONS, MIN_WAGE } from "@/constants/constants";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Input from "@/components/Input";
import type { ShopFormProps, FormData } from "../Shop.types";
import ImageUpload from "@/components/ImageUpload";
import { ImageData } from "@/components/ImageUpload/ImageUpload.types";
import ConfirmModal from "@/components/Modal/ModalContent/AlertModal";
import { IModalProps } from "@/components/Modal/Modal.types";
import { fetchShopData, updateShopDetails } from "@/api/myShop";
import { uploadImageAndGetUrl } from "@/api/ImageUpload";
import { useRecoilValue } from "recoil";
import { employerAtom } from "@/atoms/employerAtom";

const cx = classNames.bind(styles);

const ShopEdit: React.FC<ShopFormProps> = ({ onClose }) => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalData, setModalData] = useState<IModalProps>({
    modalType: "",
    content: "",
    btnName: [""],
  });
  const [initCategory, setInitCategory] = useState("");
  const [initAddress1, setInitAddress1] = useState("");
  const [initImageUrl, setInitImageUrl] = useState("");
  const shopValue = useRecoilValue(employerAtom);

  useEffect(() => {
    const fetchAndSetShopData = async () => {
      if (shopValue) {
        try {
          const getData = await fetchShopData(shopValue.shopId);

          setValue("name", getData.data.item.name);
          setValue("category", getData.data.item.category);
          setValue("address1", getData.data.item.address1);
          setValue("address2", getData.data.item.address2);
          setValue("originalHourlyPay", getData.data.item.originalHourlyPay);
          setValue("description", getData.data.item.description);
          setValue("imageUrl", getData.data.item.imageUrl);

          setInitCategory(getData.data.item.category);
          setInitAddress1(getData.data.item.address1);
          setInitImageUrl(getData.data.item.imageUrl);
        } catch (error) {
          console.error("Fetching shop data failed:", error);
        }
      }
    };

    fetchAndSetShopData();
  }, [shopValue, setValue]);

  const handleCloseAlert = () => {
    setShowAlert(false);
    if (modalType === "confirm") {
      onClose();
    }
  };

  const handleSubmitForm = async (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("address1", data.address1);
    formData.append("address2", data.address2);
    formData.append("originalHourlyPay", data.originalHourlyPay.toString());
    formData.append("description", data.description);

    if (data.originalHourlyPay < MIN_WAGE) {
      setModalData({
        modalType: "alert",
        content: `기본 시급은 최저 시급인 ${MIN_WAGE}원 이상이어야 합니다.`,
        btnName: ["확인"],
      });
      setShowAlert(true);
      setModalType("alert");
      return;
    }

    if (imageData && imageData.file) {
      try {
        const imageUrl = await uploadImageAndGetUrl(imageData.file);
        formData.append("imageUrl", imageUrl);
      } catch (error) {
        console.error("Image upload error(ShopForm):", error);
        return;
      }
    } else {
      formData.append("imageUrl", initImageUrl);
    }

    try {
      const response = await updateShopDetails(shopValue.shopId, formData);
      if (response.status === 200) {
        setModalData({
          modalType: "alert",
          content: "수정이 완료되었습니다.",
          btnName: ["확인"],
        });
        setShowAlert(true);
        setModalType("confirm");
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
                init={initCategory}
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
                init={initAddress1}
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
          <ImageUpload
            onImageSelected={setImageData}
            existingImageUrl={initImageUrl}
          />
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
              <Button btnColorType="orange">수정하기</Button>
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
    </div>
  );
};

export default ShopEdit;
