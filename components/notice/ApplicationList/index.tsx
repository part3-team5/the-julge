import styles from "./ApplicationList.module.scss";
import classNames from "classnames/bind";
import Pagination from "@/components/Pagination";
import phoneInsertHyphen from "@/utils/phoneInsertHyphen";
import { ApplicationListProps } from "./ApplicationList.types";
import { IApplicant } from "@/types/User";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const ApplicationList = ({ applicantList, handleStatusClick, noticeId }: ApplicationListProps) => {
  const router = useRouter();
  const { page = 1 } = router.query;
  const currentPage = parseInt(page as string, 10);
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentApplicants = applicantList.slice(indexOfFirstPost, indexOfLastPost);

  console.log(currentApplicants[0].status);
  return (
    <section className={cx("applicant-list")}>
      <h2 className={cx("notice--head__name")}>신청자 목록</h2>
      <ul className={cx("list-wrap")}>
        <li className={cx("list-header")}>
          <div>신청자</div>
          <div className={cx("intro")}>소개</div>
          <div className={cx("phone")}>전화번호</div>
          <div>상태</div>
        </li>
        {currentApplicants &&
          currentApplicants.map((applicant: IApplicant) => (
            <li className={cx("list-content")} key={applicant.id}>
              <div className={cx("name")}>{applicant.user.name}</div>
              <div className={cx("intro")}>
                <p className={cx("bio")}>{applicant.user.bio}</p>
              </div>
              <div className={cx("phone")}>{phoneInsertHyphen(applicant.user.phone)}</div>
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
          <Pagination
            currentPage={currentPage}
            totalPosts={applicantList.length}
            postsPerPage={postsPerPage}
            type="applicant"
            noticeId={noticeId}
          />
        </li>
      </ul>
    </section>
  );
};

export default ApplicationList;
