import styles from "./NoticeDetailed.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/Button";
import clockIcon from "@/public/image/icon/clock-icon.svg";
import pathIcon from "@/public/image/icon/path-icon.svg";
import HourlyPayincreaseButton from "@/components/HourlyPayincreaseButton";
import Image from "next/image";
import { INoticeDataProps } from "@/types/Notice";
import { formatCurrency } from "@/utils/formatCurrency";
import moment from "moment";

const cx = classNames.bind(styles);

const NoticeDetailed = ({ shopData }: INoticeDataProps) => {
  const startTime = moment(shopData.startsAt);
  const endTime = moment(startTime).add(shopData.workhour, "hours");
  const now = moment();
  const isPast = now.isAfter(endTime);

  const startTimeFormatted = startTime.format("YYYY-MM-DD HH:mm");
  const endTimeFormatted = endTime.format("HH:mm");
  const duration = `${shopData.workhour}시간`;

  return (
    <section className={cx("notice")}>
      <div className={cx("notice--head")}>
        <span className={cx("notice__category")}>{shopData.shop.category}</span>
        <h2 className={cx("notice--head__name")}>{shopData.shop.name}</h2>
      </div>
      <div className={cx("notice-info")}>
        <div className={cx("notice-info__img")}>
          <Image
            fill
            style={{
              objectFit: "cover",
            }}
            src={shopData.shop.imageUrl}
            alt="가게 이미지"
          />
        </div>

        <div className={cx("notice-info--detail-wrap")}>
          <div className={cx("notice-info--detail")}>
            <div className={cx("notice-info--detail__salary")}>
              <span className={cx("notice__category")}>시급</span>
              <div className={cx("notice-info__salary-wrap")}>
                <span className={cx("notice-info__salary")}>
                  {formatCurrency(shopData.hourlyPay)}원
                </span>
                <div>
                  <HourlyPayincreaseButton
                    isPast={false}
                    increasePercent={50}
                  />
                </div>
              </div>
            </div>
            <div className={cx("with-icon-wrap")}>
              <Image src={clockIcon} alt="시계 아이콘" />
              <span>
                {`${startTimeFormatted}~${endTimeFormatted} (${duration})`}
              </span>
            </div>
            <div className={cx("with-icon-wrap")}>
              <Image src={pathIcon} alt="위치 아이콘" />
              <span>{shopData.shop.address1}</span>
            </div>
            <p className={cx("notice-info__intro")}>
              {shopData.shop.description}
            </p>
          </div>
          <Button btnColorType="orange" btnCustom="userNoticeDetailed">
            신청하기
          </Button>
        </div>
      </div>

      <div className={cx("notice-info--explain")}>
        <span className={cx("notice-info--explain__title")}>공고 설명</span>
        <p className={cx("notice-info--explain__content")}>
          {shopData.description}
        </p>
      </div>
    </section>
  );
};

export default NoticeDetailed;
