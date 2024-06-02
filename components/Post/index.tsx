import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import moment from "moment";
import styles from "./Post.module.scss";
import { PostProps } from "@/types/interface";
import HourlyPayincreaseButton from "../HourlyPayincreaseButton";

const cx = classNames.bind(styles);

const Post: React.FC<PostProps> = ({ startsAt, workhour, increasePercent }) => {
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

    return (
        <div className={cx("post__container", { disabled: isPast })}>
            <div className={cx("postImage__container")}>
                <Image
                    className={cx("postImage")}
                    src="/image/sample.jpg"
                    width={280}
                    height={160}
                    alt="공고 이미지"
                />
                {isPast && <div className={cx("overlay")}>지난 공고</div>}
            </div>
            <p className={cx("postStoreText", { disabled: isPast })}>
                엄청진짜많이 이름이 긴 가게가 있을수도
            </p>
            <div className={cx("postText__container", { disabled: isPast })}>
                <div className={cx("postText__subtext", { disabled: isPast })}>
                    <Image
                        className={cx("icon")}
                        src={`/image/icon/post_clock_icon${isPast ? "_disabled" : ""}.svg`}
                        width={20}
                        height={20}
                        alt="clock icon"
                    />
                    {`${startTimeFormatted}~${endTimeFormatted} (${duration})`}
                </div>
                <div className={cx("postText__subtext", { disabled: isPast })}>
                    <Image
                        className={cx("icon")}
                        src={`/image/icon/post_location_icon${isPast ? "_disabled" : ""}.svg`}
                        width={20}
                        height={20}
                        alt="location icon"
                    />
                    서울시 어딘가
                </div>
                <div className={cx("post__footer", { disabled: isPast })}>
                    <p className={cx("postPrice", { disabled: isPast })}>15,000원</p>
                    <HourlyPayincreaseButton isPast={isPast} increasePercent={increasePercent} />
                </div>
            </div>
        </div>
    );
};

export default Post;
