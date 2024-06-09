import styles from "./DetailedMyShopNotice.module.scss";
import classNames from "classnames/bind";
import NoticeDetailed from "@/components/notice/NoticeDetailed";
import Pagination from "@/components/Pagination";
import { useGetDetailedNotice } from "@/hooks/useGetDetailedNotice";
import { useEffect, useState } from "react";
import { getApplicantList, putApplicationStatus } from "@/api/notice";
import phoneInsertHyphen from "@/utils/phoneInsertHyphen";
import { IApplicant, IApplicantGetApiData } from "./DetailedMyShopNotice.types";
import { useModal } from "@/hooks/useModal";

const cx = classNames.bind(styles);

const testShopId = "9091b6fc-c968-41c8-ba34-a4b90dd5a603";
const testNoticeId = "7f80319a-e354-4036-be58-6749227b13af";

const DetailedMyShopNotice = () => {
  const { noticeShopData } = useGetDetailedNotice(testShopId, testNoticeId);
  const { openModal, closeModal } = useModal();
  const [applicantList, setApplicantList] = useState<IApplicant[]>();

  useEffect(() => {
    if (noticeShopData) {
      handleApplicantGetData();
    }
  }, [noticeShopData]);

  const handleApplicantGetData = async () => {
    const data = await getApplicantList(testShopId, testNoticeId);

    if (data.count > 0) {
      const filteredItems = data.items.map(
        ({ item }: IApplicantGetApiData) => ({
          id: item.id,
          status: item.status,
          user: item.user.item,
        })
      );

      setApplicantList(filteredItems);
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
      shopId: testShopId,
      noticeId: testNoticeId,
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

        <section className={cx("applicant-list")}>
          <h2 className={cx("notice--head__name")}>신청자 목록</h2>
          <ul className={cx("list-wrap")}>
            <li className={cx("list-header")}>
              <div>신청자</div>
              <div>소개</div>
              <div>전화번호</div>
              <div>상태</div>
            </li>
            {applicantList &&
              applicantList.map((applicant: IApplicant) => (
                <li className={cx("list-content")} key={applicant.id}>
                  <div>{applicant.user.name}</div>
                  <div>
                    <p className={cx("bio")}>{applicant.user.bio}</p>
                  </div>
                  <div>{phoneInsertHyphen(applicant.user.phone)}</div>
                  <div>
                    <div className={cx("btn-wrap")}>
                      {applicant.status === "pending" && (
                        <>
                          <button
                            className={cx("state-btn-reject")}
                            onClick={() => {
                              handleStatusClick("rejected", applicant.id);
                            }}
                          >
                            거절하기
                          </button>
                          <button
                            className={cx("state-btn-approve")}
                            onClick={() => {
                              handleStatusClick("accepted", applicant.id);
                            }}
                          >
                            승인하기
                          </button>
                        </>
                      )}

                      {applicant.status === "accepted" && (
                        <div className={cx("state-approve")}>승인 완료</div>
                      )}
                      {applicant.status === "rejected" && (
                        <div className={cx("state-reject")}>거절</div>
                      )}
                    </div>
                  </div>
                </li>
              ))}

            <li className={cx("list-footer")}>
              <Pagination currentPage={1} totalPosts={2} postsPerPage={1} />
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default DetailedMyShopNotice;
