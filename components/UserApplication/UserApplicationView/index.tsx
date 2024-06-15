import React, { useState, useCallback, useEffect } from "react";
import styles from "./UserApplicationView.module.scss";
import classNames from "classnames/bind";
import StateButton from "../State";
import { instance } from "@/utils/instance";
import { ApplicationItem } from "../UserApplication.types";
import { calculateEndTime, formatDateTime } from "@/utils/time";
import { ApplicationStatus } from "../State/State.types";
import Pagination from "@/components/Pagination";
import { formatCurrency } from "@/utils/formatCurrency";
import { getUserId } from "@/utils/jwt";
import useResize from "@/hooks/useResize";
import { MOBILE, TABLET } from "@/constants/constants";

const cx = classNames.bind(styles);

const ApplicationView = () => {
  const [applicationList, setApplicationList] = useState<ApplicationItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const postsPerPage = 5;
  const isMobile = useResize(MOBILE);
  const isTablet = useResize(TABLET);

  const getApplicationList = useCallback(async () => {
    const userId = getUserId();

    try {
      const response = await instance.get<{
        count: number;
        hasNext: boolean;
        items: ApplicationItem[];
      }>(`/users/${userId}/applications`, {
        params: {
          offset: (currentPage - 1) * postsPerPage,
          limit: postsPerPage,
        },
      });
      setApplicationList(response.data.items);
      setTotalPosts(response.data.count);
      setHasNext(response.data.hasNext);
    } catch (error) {
      console.log("GET ApplicationList Error :", error);
    }
  }, [currentPage, postsPerPage]);

  useEffect(() => {
    getApplicationList();
  }, [getApplicationList]);

  return (
    <>
      <div className={cx("content-wrap")}>
        <section className={cx("application-list")}>
          <h2 className={cx("notice--head__name")}>신청 내역</h2>
          <ul className={cx("list-wrap")}>
            <li className={cx("list-header")}>
              <div>가게</div>
              <div className={cx({ hidden: isMobile })}>일자</div>
              <div className={cx({ hidden: isMobile || isTablet })}>시급</div>
              <div>상태</div>
            </li>
            {applicationList.map((application) => (
              <li key={application.item.id} className={cx("list-content")}>
                <div>{application.item.shop.item.name}</div>
                <div className={cx({ hidden: isMobile })}>
                  {formatDateTime(
                    application.item.notice.item.startsAt,
                    "time"
                  )}
                  ~
                  {formatDateTime(
                    calculateEndTime(
                      application.item.notice.item.startsAt,
                      application.item.notice.item.workhour
                    ).toISOString(),
                    "time"
                  )}
                  ({application.item.notice.item.workhour}시간)
                </div>
                <div className={cx({ hidden: isMobile || isTablet })}>
                  {formatCurrency(application.item.notice.item.hourlyPay)}원
                </div>
                <div>
                  <div className={cx("btn-wrap")}>
                    <StateButton
                      state={application.item.status as ApplicationStatus}
                    />
                  </div>
                </div>
              </li>
            ))}
            <li className={cx("list-footer")}>
              <Pagination
                currentPage={currentPage}
                totalPosts={totalPosts}
                postsPerPage={postsPerPage}
                type="profileNotice"
                onPageChange={setCurrentPage}
              />
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default ApplicationView;
