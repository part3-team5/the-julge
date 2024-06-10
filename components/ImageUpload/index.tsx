import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./ImageUpload.module.scss";
import Image from "next/image";
import { getPresignedUrl, uploadToS3 } from "@/api/ImageUpload";
import classNames from "classnames/bind";
import { ImageUploadProps } from "./ImageUpload.types";

const cx = classNames.bind(styles);

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setPreview(previewUrl);
        onImageSelected({ name: file.name, file: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("이미지를 선택해주세요.");
      return;
    }

    try {
      const { url } = await getPresignedUrl({ name: selectedImage.name });

      await uploadToS3(url, selectedImage);

      alert("이미지 업로드 성공!");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드 실패");
    }

    setSelectedImage(null);
    setPreview(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="imageUpload" className={cx("container")}>
          {preview ? (
            <Image
              src={preview}
              width={483}
              height={276}
              alt="이미지 미리보기"
              className={cx("preview-image")}
            />
          ) : (
            <Image src="/image/addImage.svg" width={110} height={64} alt="이미지 추가" />
          )}
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.file}
          />
        </label>
      </div>
    </form>
  );
};

export default ImageUpload;
