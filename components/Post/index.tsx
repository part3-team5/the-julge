import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import moment from "moment";
import styles from "./Post.module.scss";
import HourlyPayincreaseButton from "../HourlyPayincreaseButton";
import { PostProps } from "./Post.types";
import { formatCurrency } from "@/utils/formatCurrency";

const cx = classNames.bind(styles);

const Post: React.FC<PostProps> = ({
  startsAt,
  workhour,
  increasePercent,
  shopName,
  shopAddress1,
  shopImageUrl,
  hourlyPay,
  closed = false,
}) => {
  const startTime = moment(startsAt);
  const endTime = moment(startTime).add(workhour, "hours");
  const now = moment();
  const isPast = now.isAfter(startTime);
  const isClosed = closed;

  const startTimeFormatted = startTime.format("YYYY-MM-DD HH:mm");
  const endTimeFormatted = endTime.format("HH:mm");
  const duration = `${workhour}시간`;

  return (
    <div className={cx("post__container", { disabled: isPast })}>
      <div className={cx("postImage__container")}>
        <Image
          className={cx("postImage")}
          src={shopImageUrl}
          width={280}
          height={160}
          alt="공고 이미지"
        />
        {isPast && <div className={cx("overlay")}>지난 공고</div>}
        {isClosed && <div className={cx("overlay")}>마감 완료</div>}
      </div>
      <p className={cx("postStoreText", { disabled: isPast })}>{shopName}</p>
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
          {shopAddress1}
        </div>
        <div className={cx("post__footer", { disabled: isPast })}>
          <p className={cx("postPrice", { disabled: isPast })}>{`${formatCurrency(
            hourlyPay
          )}원`}</p>
          {increasePercent >= 1 && (
            <HourlyPayincreaseButton isPast={isPast} increasePercent={increasePercent} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
