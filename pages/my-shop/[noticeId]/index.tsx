import styles from "./DetailedMyShopNotice.module.scss";
import classNames from "classnames/bind";
import NoticeDetailed from "@/components/notice/NoticeDetailed";
import { useGetDetailedNotice } from "@/hooks/useGetDetailedNotice";
import { useEffect, useState, useCallback } from "react";
import { getApplicantList, putApplicationStatus } from "@/api/notice";
import { IApplicant } from "@/types/User";
import { useModal } from "@/hooks/useModal";
import ApplicationList from "@/components/notice/ApplicationList";
import { useRecoilValue } from "recoil";
import { employerAtom } from "@/atoms/employerAtom";
import { useRouter } from "next/router";
import { IApplicantGetApiData } from "@/types/MyShopNotice";

const cx = classNames.bind(styles);

const DetailedMyShopNotice = () => {
  const router = useRouter();
  const { noticeId } = router.query;
  const noticeIdString = noticeId as string;
  const shopValue = useRecoilValue(employerAtom);
  const shopId = shopValue?.shopId; // 안전하게 접근
  const [loading, setLoading] = useState(true);

  const { noticeShopData } = useGetDetailedNotice(shopId, noticeIdString);
  const { openModal, closeModal } = useModal();
  const [applicantList, setApplicantList] = useState<IApplicant[]>([]);

  const handleApplicantGetData = useCallback(async () => {
    const res = await getApplicantList(shopId, noticeIdString);

    if (res.data.count > 0) {
      const filteredItems = res.data.items.map(
        ({ item }: IApplicantGetApiData) => ({
          id: item.id,
          status: item.status,
          user: item.user.item,
        })
      );

      setApplicantList(filteredItems);
    } else {
      setApplicantList([]);
    }
  }, [shopId, noticeIdString]);

  useEffect(() => {
    if (noticeShopData) {
      handleApplicantGetData();
    }
  }, [noticeShopData, handleApplicantGetData]);

  useEffect(() => {
    if (shopId) {
      setLoading(false); // shopId가 설정되면 로딩 완료
    }
  }, [shopId]);

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

  if (loading) {
    return <div>Loading...</div>; // 로딩 중에는 로딩 메시지 표시
  }

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
