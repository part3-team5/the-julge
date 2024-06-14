import React, { useState, useEffect } from "react";
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
import { calculateIncreasePercent } from "@/utils/calculateIncreasePercent";

import { getApplicantList, postApplicant } from "@/api/notice";
import { useRouter } from "next/router";
import getStringValue from "@/utils/getStringValue";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState, signupState } from "@/atoms/userAtom";

const cx = classNames.bind(styles);

const NoticeDetailed = ({ shopData }: INoticeDataProps) => {
  const [isApplied, setIsApplied] = useState(false);
  const startTime = moment(shopData.startsAt);
  const endTime = moment(startTime).add(shopData.workhour, "hours");
  const now = moment();
  const isPast = now.isAfter(endTime);

  const router = useRouter();
  const { noticeId } = router.query;

  const isClosed = shopData.closed;

  const startTimeFormatted = startTime.format("YYYY-MM-DD HH:mm");
  const endTimeFormatted = endTime.format("HH:mm");
  const duration = `${shopData.workhour}시간`;

  const sign = useRecoilValue(signupState);
  const auth = useRecoilValue(authState);

  const increasePercent = calculateIncreasePercent(
    shopData.shop.originalHourlyPay,
    shopData.hourlyPay
  );

  const handleApplyClick = async () => {
    try {
      const response = await postApplicant(shopData.shop.id, shopData.id);
      if (response?.status === 201) {
        setIsApplied(!isApplied);
      }
    } catch (error) {
      console.error("신청 중 오류 발생:", error);
    }
  };

  const handleCheckApply = async () => {
    // try {
    //   const response = await getApplicantList(shopData.shop.id, getStringValue(noticeId));
    //   if (response?.status === 201) {
    //     setIsApplied(!isApplied);
    //   }
    // } catch (error) {
    //   console.error("신청 중 오류 발생:", error);
    // }
  };

  useEffect(() => {
    if (!shopData) return;

    handleCheckApply();
    console.log("shopData.shop.id :: ", shopData.shop.id);
    console.log("noticeId :: ", noticeId);

    console.log("auth::", auth);
    console.log("sign.type::", sign.type);
    if (auth.isAuthenticated && sign.type === "employee") {
    }
  }, []);

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
          {isPast && <div className={cx("overlay")}>지난 공고</div>}
          {isClosed && <div className={cx("overlay")}>마감 완료</div>}
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
                  {increasePercent >= 1 && (
                    <HourlyPayincreaseButton
                      isPast={isPast || isClosed}
                      increasePercent={increasePercent}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={cx("with-icon-wrap")}>
              <Image src={clockIcon} alt="시계 아이콘" />
              <span>{`${startTimeFormatted}~${endTimeFormatted} (${duration})`}</span>
            </div>
            <div className={cx("with-icon-wrap")}>
              <Image src={pathIcon} alt="위치 아이콘" />
              <span>{shopData.shop.address1}</span>
            </div>
            <p className={cx("notice-info__intro")}>
              {shopData.shop.description}
            </p>
          </div>
          {isPast || isClosed ? (
            <Button btnColorType="gray" btnCustom="userNoticeDetailed" disabled>
              신청불가
            </Button>
          ) : isApplied ? (
            <Button btnColorType="white" btnCustom="userNoticeDetailed">
              취소하기
            </Button>
          ) : (
            <Button
              btnColorType="orange"
              btnCustom="userNoticeDetailed"
              onClick={handleApplyClick}
            >
              신청하기
            </Button>
          )}
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
