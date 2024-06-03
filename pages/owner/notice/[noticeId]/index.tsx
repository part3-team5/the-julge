import styles from "./DetailedOwnerNotice.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const DetailedOwnerNotice = () => {
  return (
    <>
      <div className={cx("content-wrap")}>
        <section className={cx("notice")}></section>

        <section className={cx("recentlt-viewed")}></section>
      </div>
    </>
  );
};

export default DetailedOwnerNotice;
