import styles from "./DetailedMyShopNotice.module.scss";
import classNames from "classnames/bind";
import NoticeDetailed from "@/components/notice/NoticeDetailed";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
import { APPLICANT } from "@/public/applicantTest";

const cx = classNames.bind(styles);

const DetailedMyShopNotice = () => {
  const router = useRouter();
  const { page = 1, noticeId } = router.query;
  const currentPage = parseInt(page as string, 10);
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentApplicants = APPLICANT.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className={cx("content-wrap")}>
        {/* <NoticeDetailed /> */}

        <section className={cx("applicant-list")}>
          <h2 className={cx("notice--head__name")}>신청자 목록</h2>
          <ul className={cx("list-wrap")}>
            <li className={cx("list-header")}>
              <div>신청자</div>
              <div>소개</div>
              <div>전화번호</div>
              <div>상태</div>
            </li>
            {currentApplicants.map((applicant) => (
              <li key={applicant.id} className={cx("list-content")}>
                <div>{applicant.name}</div>
                <div>{applicant.bio}</div>
                <div>{applicant.phone}</div>
                <div>
                  <div className={cx("btn-wrap")}>
                    <button className={cx("state-btn-reject")}>거절하기</button>
                    <button className={cx("state-btn-approve")}>승인하기</button>
                  </div>
                </div>
              </li>
            ))}
            <li className={cx("list-footer")}>
              <Pagination
                currentPage={currentPage}
                totalPosts={APPLICANT.length}
                postsPerPage={postsPerPage}
                type="applicant"
                noticeId={noticeId as string}
              />
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default DetailedMyShopNotice;
