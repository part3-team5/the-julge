// 메인 화면 맞춤 공고 컴포넌트
import React, { useEffect, useState } from "react";
import Post from "@/components/Post";
import styles from "./CustomNoticeList.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CustomNoticeList = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(3);

    const posts = [
        { startsAt: "2024-06-30T00:00:00Z", workhour: 1 },
        { startsAt: "2024-05-31T00:00:00Z", workhour: 5 },
        { startsAt: "2024-07-31T00:00:00Z", workhour: 5 },
        { startsAt: "2024-07-31T00:00:00Z", workhour: 5 },
        { startsAt: "2021-07-31T00:00:00Z", workhour: 5 },
        { startsAt: "2022-07-31T00:00:00Z", workhour: 5 },
        { startsAt: "2024-07-31T00:00:00Z", workhour: 5 },
        { startsAt: "2024-07-31T00:00:00Z", workhour: 5 },
    ];

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

    // 3초마다 다음 공고로 자동 슬라이드(pc: 3개씩, tablet mobile: 2개씩)
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
                        <Post key={index} startsAt={post.startsAt} workhour={post.workhour} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomNoticeList;
