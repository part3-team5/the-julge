// 메인 화면 공고 목록 컴포넌트
import React, { useState } from "react";
import { useRouter } from "next/router";
import Post from "@/components/Post";
import DropdownSmall from "@/components/DropdownSmall";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import { posts } from "@/public/postTest";
import styles from "./NoticeList.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const NoticeList: React.FC = () => {
  const router = useRouter();
  const { page = 1 } = router.query;
  const currentPage = parseInt(page as string, 10);
  const postsPerPage = 6;

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleOpenFilter = () => {
    setIsFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <div className={cx("notice__wrapper")}>
      <div className={cx("notice__container")}>
        <div className={cx("noticeTitle__container")}>
          <h2 className={cx("title")}>전체 공고</h2>
          <div className={cx("noticeTitle__options")}>
            <DropdownSmall />
            <div className={cx("filter__wrapper")}>
              <button className={cx("filter__btn")} onClick={handleOpenFilter}>
                상세 필터
              </button>
              {isFilterOpen && <Filter onClose={handleCloseFilter} />}
            </div>
          </div>
        </div>
        <div className={cx("post__grid")}>
          {currentPosts.map((post, index) => (
            <Post
              key={index}
              startsAt={post.startsAt}
              workhour={post.workhour}
              increasePercent={post.increasePercent}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPosts={posts.length}
          postsPerPage={postsPerPage}
        />
      </div>
    </div>
  );
};

export default NoticeList;
