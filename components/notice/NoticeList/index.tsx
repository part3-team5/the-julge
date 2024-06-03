// 메인 화면 공고 목록 컴포넌트
import React from "react";
import Post from "@/components/Post";
import DropdownSmall from "@/components/DropdownSmall";
import Filter from "@/components/Filter";
import { posts } from "@/public/postTest";
import styles from "./NoticeList.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const NoticeList = () => {
  return (
    <div className={cx("notice__wrapper")}>
      <div className={cx("notice__container")}>
        <div className={cx("noticeTitle__container")}>
          <h2 className={cx("title")}>전체 공고</h2>
          <div className={cx("noticeTitle__options")}>
            <DropdownSmall />
            <Filter />
          </div>
        </div>
        <div className={cx("post__grid")}>
          {posts.map((post, index) => (
            <Post
              key={index}
              startsAt={post.startsAt}
              workhour={post.workhour}
              increasePercent={post.increasePercent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeList;
