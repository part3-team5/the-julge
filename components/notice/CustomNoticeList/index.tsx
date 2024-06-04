import React, { useEffect, useState } from "react";
import Post from "@/components/Post";
import styles from "./CustomNoticeList.module.scss";
import classNames from "classnames/bind";
import { posts } from "@/public/postTest";

const cx = classNames.bind(styles);

const CustomNoticeList = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1199) {
        setPostsPerPage(2);
      } else {
        setPostsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 3초마다 다음 공고로 자동 슬라이드
  const totalSlides = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const getVisiblePosts = () => {
    const startIndex = currentSlide * postsPerPage;
    return posts.slice(startIndex, startIndex + postsPerPage);
  };

  return (
    <div className={cx("customNotice__wrapper")}>
      <div className={cx("customNotice__container")}>
        <h2 className={cx("title")}>맞춤 공고</h2>
        <div className={cx("post__container")}>
          {getVisiblePosts().map((post, index) => (
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

export default CustomNoticeList;
