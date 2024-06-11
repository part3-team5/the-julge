import styles from "./DetailedMyShopNotice.module.scss";
import classNames from "classnames/bind";
import NoticeDetailed from "@/components/notice/NoticeDetailed";
import { useGetDetailedNotice } from "@/hooks/useGetDetailedNotice";
import { useEffect, useState } from "react";
import { getApplicantList, putApplicationStatus } from "@/api/notice";
import { IApplicantGetApiData } from "./DetailedMyShopNotice.types";
import { IApplicant } from "@/types/User";
import { useModal } from "@/hooks/useModal";
import ApplicationList from "@/components/notice/ApplicationList";
import { useRecoilValue } from "recoil";
import { employerAtom } from "@/atoms/employerAtom";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const DetailedMyShopNotice = () => {
  const router = useRouter();
  const { noticeId } = router.query;
  const noticeIdString = noticeId as string;
  const shopValue = useRecoilValue(employerAtom);
  const shopId = shopValue.shopId;

  const { noticeShopData } = useGetDetailedNotice(shopId, noticeIdString);
  const { openModal, closeModal } = useModal();
  const [applicantList, setApplicantList] = useState<IApplicant[]>([]);

  useEffect(() => {
    if (noticeShopData) {
      handleApplicantGetData();
    }
  }, [noticeShopData]);

  const handleApplicantGetData = async () => {
    const res = await getApplicantList(shopId, noticeIdString);

    if (res.data.count > 0) {
      const filteredItems = res.data.items.map(({ item }: IApplicantGetApiData) => ({
        id: item.id,
        status: item.status,
        user: item.user.item,
      }));

      setApplicantList(filteredItems);
    } else {
      setApplicantList([]);
    }
  };

  const handleStatusClick = (status: string, applicationId: string) => {
    const modalText = status === "accepted" ? "승인" : "거절";
    openModal({
      modalType: "select",
      content: `신청을 ${modalText}하시겠어요?`,
      btnName: ["아니오", `${modalText}하기`],
      callBackFnc: () => handleStateCallback(status, applicationId),
    });
  };

  const handleStateCallback = async (status: string, applicationId: string) => {
    const urlIdObj = {
      shopId: shopId,
      noticeId: noticeIdString,
      applicationId: applicationId,
    };

    const response = await putApplicationStatus(status, urlIdObj);

    if (response?.status === 200) {
      alert("성공");
      closeModal();
      handleApplicantGetData();
    }
  };

  return (
    <>
      <div className={cx("content-wrap")}>
        <NoticeDetailed shopData={noticeShopData} />
        {applicantList.length > 0 ? (
          <ApplicationList
            applicantList={applicantList}
            handleStatusClick={handleStatusClick}
            noticeId={noticeIdString}
          />
        ) : (
          <div className={cx("no-applicants")}>신청자가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default DetailedMyShopNotice;
