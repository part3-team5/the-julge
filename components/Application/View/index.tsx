import styles from "./View.module.scss";
import classNames from "classnames/bind";
import Pagination from "@/components/Pagination";
import StateButton from "../State";

const cx = classNames.bind(styles);

const View = () => {
  return (
    <>
      <div className={cx("content-wrap")}>
        <section className={cx("applicant-list")}>
          <h2 className={cx("notice--head__name")}>신청 내역</h2>
          <ul className={cx("list-wrap")}>
            <li className={cx("list-header")}>
              <div>가게</div>
              <div>일자</div>
              <div>시급</div>
              <div>상태</div>
            </li>
            <li className={cx("list-content")}>
              <div>가나다</div>
              <div>2024-06-08 10:00~12:00(2시간)</div>
              <div>15,000원</div>
              <div>
                <div className={cx("btn-wrap")}>
                  <StateButton state={"approve"} />
                </div>
              </div>
            </li>
            <li className={cx("list-content")}>
              <div>마바사</div>
              <div>2024-06-09 12:00~16:00(4시간)</div>
              <div>20,000원</div>
              <div>
                <StateButton state={"refuse"} />
              </div>
            </li>
            <li className={cx("list-content")}>
              <div>아자차카</div>
              <div>2024-06-10 16:00~22:00(6시간)</div>
              <div>25,000원</div>
              <div>
                <StateButton state={"waiting"} />
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

export default View;
