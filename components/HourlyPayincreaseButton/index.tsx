import React, { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./HourlyPayincreaseButton.module.scss";

const cx = classNames.bind(styles);

interface HourlyPayincreaseButtonProps {
    isPast: boolean;
    increasePercent: number;
}

const HourlyPayincreaseButton: React.FC<HourlyPayincreaseButtonProps> = ({
    isPast,
    increasePercent,
}) => {
    const [isMobile, setIsMobile] = useState(false);

    // 화면 크기에 따른 아이콘 크기 및 색 변경 위함
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
            {`기존 시급보다 ${increasePercent}%`}
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
