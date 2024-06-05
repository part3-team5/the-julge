import styles from "./DetailedOwnerNotice.module.scss";
import classNames from "classnames/bind";
import NoticeDetailed from "@/components/notice/NoticeDetailed";

const cx = classNames.bind(styles);

const DetailedOwnerNotice = () => {
  return (
    <>
      <div className={cx("content-wrap")}>
        <NoticeDetailed />

        <section className={cx("applicant-list")}>
          <h2 className={cx("notice--head__name")}>신청자 목록</h2>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default DetailedOwnerNotice;
