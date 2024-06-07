import React from "react";
import { useRouter } from "next/router";
import styles from "./Pagination.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { PaginationProps } from "./Pagination.types";

const cx = classNames.bind(styles);

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPosts,
  postsPerPage,
  type,
  noticeId,
}) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const maxPage = 7;

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      if (type === "notice") {
        router.push(`/?page=${page}`);
      } else if (type === "applicant") {
        router.push(`/my-shop/${noticeId}/?page=${page}`);
      }
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxPage / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage - half < 1) {
      end = Math.min(totalPages, end + (half - (currentPage - 1)));
    }

    if (currentPage + half > totalPages) {
      start = Math.max(1, start - (currentPage + half - totalPages));
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={cx("page-button", { active: i === currentPage })}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={cx("wrapper")}>
      {totalPages > maxPage && (
        <button
          className={cx("arrow-button")}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Image src="/image/icon/prev_icon.svg" width={20} height={20} alt="이전" />
        </button>
      )}
      {renderPageNumbers()}
      {totalPages > maxPage && (
        <button
          className={cx("arrow-button")}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Image src="/image/icon/next_icon.svg" width={20} height={20} alt="다음" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
