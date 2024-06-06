import classNames from "classnames/bind";
import styles from "../Shop.module.scss";
import Button from "@/components/Button";
import { ShopEmptyProps } from "../Shop.types";

const cx = classNames.bind(styles);

const ShopEmpty = ({ onClick }: ShopEmptyProps) => {
  return (
    <div className={cx("profile")}>
      <h1 className={cx("title")}>내 가게</h1>
      <div className={cx("box")}>
        <p className={cx("description")}>내 가게를 소개하고 공고도 등록해 보세요.</p>
        <div className={cx("button-wrapper")}>
          <Button onClick={onClick} btnColorType="orange">
            가게 등록하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopEmpty;
