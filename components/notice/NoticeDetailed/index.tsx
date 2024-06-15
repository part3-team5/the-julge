import React, { useState, useEffect } from "react";
import styles from "./NoticeDetailed.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/Button";
import clockIcon from "@/public/image/icon/clock-icon.svg";
import pathIcon from "@/public/image/icon/path-icon.svg";
import HourlyPayincreaseButton from "@/components/HourlyPayincreaseButton";
import Image from "next/image";
import { INoticeDataProps, NoticeDetailedProps } from "@/types/Notice";
import { formatCurrency } from "@/utils/formatCurrency";
import moment from "moment";
import { calculateIncreasePercent } from "@/utils/calculateIncreasePercent";
import { postApplicant, putApplicationStatus } from "@/api/notice";
import { useRouter } from "next/router";
import getStringValue from "@/utils/getStringValue";
import { useRecoilValue } from "recoil";
import { signupState } from "@/atoms/userAtom";
import { getMyApplicationList } from "@/api/user";
import { IApplicantGetApiData } from "@/types/MyShopNotice";
import { useModal } from "@/hooks/useModal";
import { profileAtom } from "@/atoms/profileAtom";
import { employerAtom } from "@/atoms/employerAtom";

const cx = classNames.bind(styles);

const NoticeDetailed = ({
  shopData,
  onEditClick,
}: NoticeDetailedProps & { onEditClick: () => void }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [isOwnerNotice, setOwnerNotice] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const startTime = moment(shopData.startsAt);
  const endTime = moment(startTime).add(shopData.workhour, "hours");
  const now = moment();
  const isPast = now.isAfter(endTime);

  const router = useRouter();
  const { noticeId, shopId } = router.query;

  const isClosed = shopData.closed;

  const startTimeFormatted = startTime.format("YYYY-MM-DD HH:mm");
  const endTimeFormatted = endTime.format("HH:mm");
  const duration = `${shopData.workhour}시간`;

  const sign = useRecoilValue(signupState);
  const employeeProfile = useRecoilValue(profileAtom);
  const employerData = useRecoilValue(employerAtom);
  const { openModal, closeModal } = useModal();

  const increasePercent = calculateIncreasePercent(
    shopData.shop.originalHourlyPay,
    shopData.hourlyPay
  );

  const handleApplyClick = async () => {
    if (!applyValidation()) return;

    try {
      const response = await postApplicant(shopData.shop.id, shopData.id);
      if (response?.status === 201) {
        handleCheckApply();
      }
    } catch (error) {
      console.error("신청 중 오류 발생:", error);
    }
  };

  const handleCheckApply = async () => {
    try {
      const response = await getMyApplicationList(sign.userId);

      const application = response.items.find(
        ({ item }: IApplicantGetApiData) => {
          return item.shop.item.id === shopData.shop.id;
        }
      );

      if (application) {
        setIsApplied(true);
        setApplicationId(application.item.id);
      } else {
        setIsApplied(false);
      }
    } catch (error) {
      console.error("신청 중 오류 발생:", error);
    }
  };

  const handleCheckMyShop = () => {
    console.log("employerData::", employerData);
    console.log("shopData.shop.id::", shopData.shop.id);
    if (employerData.shopId !== shopData.shop.id) router.replace("/");
    setOwnerNotice(true);
  };

  const clickAppCancelBtn = () => {
    openModal({
      modalType: "select",
      content: "신청을 취소하시겠어요?",
      btnName: ["아니오", "취소하기"],
      callBackFnc: handleAppCancel,
    });
  };

  const handleAppCancel = async () => {
    const urlIdObj = {
      shopId: shopData.shop.id,
      noticeId: getStringValue(noticeId),
      applicationId: applicationId,
    };

    const response = await putApplicationStatus("canceled", urlIdObj);

    if (response?.status === 200) {
      closeModal();
      setIsApplied(false);
    }
  };

  const applyValidation = () => {
    switch (sign.type) {
      case "employee":
        if (
          !employeeProfile.name ||
          employeeProfile.name === "" ||
          !employeeProfile.address ||
          employeeProfile.address === ""
        ) {
          openModal({
            modalType: "warning",
            content: "내 프로필을 먼저 등록해 주세요.",
            btnName: ["확인"],
          });
          return false;
        }
        break;

      case "employer":
        openModal({
          modalType: "warning",
          content: "사장님 계정으로는 신청할 수 없어요.",
          btnName: ["확인"],
        });
        return false;

      default:
        openModal({
          modalType: "warning",
          content: "로그인을 해주세요.",
          btnName: ["확인"],
        });
        return false;
    }

    return true;
  };

  useEffect(() => {
    if (!shopData.id) return;
    shopId ? handleCheckApply() : handleCheckMyShop();
  }, [shopData, shopId]);

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
          {isOwnerNotice ? (
            <Button
              btnColorType="white"
              btnCustom="userNoticeDetailed"
              onClick={onEditClick}
            >
              편집하기
            </Button>
          ) : isPast || isClosed ? (
            <Button btnColorType="gray" btnCustom="userNoticeDetailed" disabled>
              신청불가
            </Button>
          ) : isApplied ? (
            <Button
              btnColorType="white"
              btnCustom="userNoticeDetailed"
              onClick={clickAppCancelBtn}
            >
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
