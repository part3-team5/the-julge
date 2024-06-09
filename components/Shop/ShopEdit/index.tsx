import classNames from "classnames/bind";
import styles from "../Shop.module.scss";
import Image from "next/image";
import { ShopFormProps } from "../Shop.types";

const cx = classNames.bind(styles);

const ShopEdit: React.FC<ShopFormProps> = ({ onClose }) => {
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
        <h2>가게 정보 수정 화면 구현 要</h2>
      </main>
    </div>
  );
};

export default ShopEdit;
