import React, { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./HourlyPayincreaseButton.module.scss";
import useResize from "@/hooks/useResize";
import { MOBILE } from "@/constants/constants";
import { formatCurrency } from "@/utils/formatCurrency";

const cx = classNames.bind(styles);

interface HourlyPayincreaseButtonProps {
  isPast: boolean;
  increasePercent: number;
}

const HourlyPayincreaseButton: React.FC<HourlyPayincreaseButtonProps> = ({
  isPast,
  increasePercent,
}) => {
  const isMobile = useResize(MOBILE);

  const arrowIconSrc = isMobile
    ? isPast
      ? "/image/icon/post_arrow_mobile_disabled.svg"
      : "/image/icon/post_arrow_mobile.svg"
    : "/image/icon/post_arrow_icon.svg";

  const buttonClass = cx("post__btn", {
    disabled: isPast,
    increase50: increasePercent >= 50 && !isPast,
    increase30: increasePercent >= 30 && increasePercent < 50 && !isPast,
    increase20: increasePercent > 0 && increasePercent < 30 && !isPast,
    increase0: increasePercent === 0 || isPast,
  });

  return (
    <div className={buttonClass}>
      <p className={cx("text")}>{`기존 시급보다 ${formatCurrency(increasePercent)}%`}</p>
      <Image
        src={arrowIconSrc}
        width={isMobile ? 16 : 20}
        height={isMobile ? 16 : 20}
        alt="arrow icon"
      />
    </div>
  );
};

export default HourlyPayincreaseButton;
