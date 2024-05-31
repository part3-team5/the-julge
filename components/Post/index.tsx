import React, { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import moment from "moment";
import styles from "./Post.module.scss";
import { PostProps } from "@/types/interface";

const Post: React.FC<PostProps> = ({ startsAt, workhour }) => {
    // 시작 시간 string -> Date 객체
    const startTime = moment(startsAt);
    const endTime = moment(startTime).add(workhour, "hours");
    const now = moment();
    const isPast = now.isAfter(endTime);

    // 시작 시간 포맷팅
    const startTimeFormatted = startTime.format("YYYY-MM-DD HH:mm");

    // 종료 시간 포맷팅 (날짜 생략)
    const endTimeFormatted = endTime.format("HH:mm");

    const duration = `${workhour}시간`;

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

    return (
        <div className={classNames(styles.postContainer, { [styles.disabled]: isPast })}>
            <div className={styles.postImageContainer}>
                <Image
                    className={styles.postImage}
                    src="/image/sample.jpg"
                    width={280}
                    height={160}
                    alt="공고 이미지"
                />
                {isPast && <div className={styles.overlay}>지난 공고</div>}
            </div>
            <p className={classNames(styles.postStoreText, { [styles.disabled]: isPast })}>
                엄청진짜많이 이름이 긴 가게가 있을수도
            </p>
            <div className={classNames(styles.postTextContainer, { [styles.disabled]: isPast })}>
                <div className={classNames(styles.postStoreSubtext, { [styles.disabled]: isPast })}>
                    <Image
                        className={styles.icon}
                        src={`/image/icon/post_clock_icon${isPast ? "_disabled" : ""}.svg`}
                        width={20}
                        height={20}
                        alt="clock icon"
                    />
                    {`${startTimeFormatted}~${endTimeFormatted} (${duration})`}
                </div>
                <div className={classNames(styles.postStoreSubtext, { [styles.disabled]: isPast })}>
                    <Image
                        className={styles.icon}
                        src={`/image/icon/post_location_icon${isPast ? "_disabled" : ""}.svg`}
                        width={20}
                        height={20}
                        alt="location icon"
                    />
                    서울시 어딘가
                </div>
                <div className={classNames(styles.postFooter, { [styles.disabled]: isPast })}>
                    <p className={classNames(styles.postPrice, { [styles.disabled]: isPast })}>
                        15,000원
                    </p>
                    <div className={classNames(styles.postBtn, { [styles.disabled]: isPast })}>
                        기존 시급보다 100%
                        <Image
                            src={arrowIconSrc}
                            width={isMobile ? 16 : 20}
                            height={isMobile ? 16 : 20}
                            alt="arrow icon"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
