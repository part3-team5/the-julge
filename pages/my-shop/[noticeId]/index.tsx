import styles from "./DetailedMyShopNotice.module.scss";
import classNames from "classnames/bind";
import NoticeDetailed from "@/components/notice/NoticeDetailed";
import Pagination from "@/components/Pagination";

const cx = classNames.bind(styles);

const DetailedMyShopNotice = () => {
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
            <li className={cx("list-content")}>
              <div>김강현</div>
              <div>
                열심히 하겠습니다!열심히 하겠습니다!열심히 하겠습니다!열심히
                하겠습니다!열심히 하겠습니다!열심히 하겠습니다!열심히
                하겠습니다!열심히 하겠습니다!열심히 하겠습니다!열심히
                하겠습니다!열심히 하겠습니다!
              </div>
              <div>010-0000-0000</div>
              <div>
                <div className={cx("btn-wrap")}>
                  <button className={cx("state-btn-reject")}>거절하기</button>
                  <button className={cx("state-btn-approve")}>승인하기</button>
                </div>
              </div>
            </li>
            <li className={cx("list-content")}>
              <div>서혜진</div>
              <div>열심히 하겠습니다!</div>
              <div>010-0000-0000</div>
              <div>
                <div className={cx("state-approve")}>승인 완료</div>
              </div>
            </li>
            <li className={cx("list-content")}>
              <div>홍길동</div>
              <div>열심히 하겠습ㅋㅋ니다!</div>
              <div>010-0000-0000</div>
              <div>
                <div className={cx("state-reject")}>거절</div>
              </div>
            </li>
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
