import styles from "./DetailedNotice.module.scss";
import classNames from "classnames/bind";
import { posts } from "@/public/postTest";
import Post from "@/components/Post";
import NoticeDetailed from "@/components/notice/NoticeDetailed";

const cx = classNames.bind(styles);

const DetailedNotice = () => {
  return (
    <>
      <div className={cx("content-wrap")}>
        <NoticeDetailed />

        <section className={cx("recentlt-viewed")}>
          <h2 className={cx("notice--head__name")}>최근에 본 공고</h2>
          <div className={cx("post__grid")}>
            {posts.slice(0, 6).map((post, index) => (
              <Post
                key={index}
                startsAt={post.startsAt}
                workhour={post.workhour}
                increasePercent={post.increasePercent}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailedNotice;
