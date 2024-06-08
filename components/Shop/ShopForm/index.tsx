import classNames from "classnames/bind";
import styles from "../Shop.module.scss";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { CATEGORYS, LOCATIONS } from "@/constants/constants";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { ShopFormProps, FormData } from "../Shop.types";
import ImageUpload from "@/components/ImageUpload";
import { ImageData } from "@/components/ImageUpload/ImageUpload.types";

const cx = classNames.bind(styles);

const ShopForm: React.FC<ShopFormProps> = ({ onClose }) => {
  const { register, handleSubmit } = useForm<FormData>();
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = {
      ...data,
      imageUrl: imageData?.imageUrl || null,
    };

    console.log(formData);
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
        <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
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
                register={register("category", { required: true })}
              />
            </section>
            <section className={cx("input-section")}>
              <label className={cx("label")} htmlFor="address1">
                주소
              </label>
              <Dropdown
                options={LOCATIONS}
                id="address1"
                register={register("address1", { required: true })}
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
      </main>
    </div>
  );
};

export default ShopForm;
