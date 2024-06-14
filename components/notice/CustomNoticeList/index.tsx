import React, { useEffect, useState } from "react";
import Post from "@/components/Post";
import styles from "./CustomNoticeList.module.scss";
import classNames from "classnames/bind";
import useResize from "@/hooks/useResize";
import { TABLET } from "@/constants/constants";
import { NoticeItem } from "@/types/types";
import { fetchNoticeList, fetchNoticesByAddress } from "@/api/NoticeList";
import Spinner from "@/components/Spinner";
import { calculateIncreasePercent } from "@/utils/calculateIncreasePercent";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { profileAtom } from "@/atoms/profileAtom";
import { authState, signupState } from "@/atoms/userAtom";

const cx = classNames.bind(styles);

const CustomNoticeList = () => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const isTablet = useResize(TABLET);
  const userData = useRecoilValue(profileAtom);
  const auth = useRecoilValue(authState);
  const sign = useRecoilValue(signupState);
  const userAddress = userData.address;

  useEffect(() => {
    if (isTablet) {
      setPostsPerPage(2);
    } else {
      setPostsPerPage(3);
    }
  }, [isTablet]);

  const totalSlides = Math.ceil(notices.length / postsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const currentPosts = () => {
    const startIndex = currentSlide * postsPerPage;
    return notices.slice(startIndex, startIndex + postsPerPage);
  };

  useEffect(() => {
    const loadNotices = async () => {
      try {
        let data = [];
        if (auth.isAuthenticated && sign.type === "employee") {
          data = await fetchNoticesByAddress(userAddress);
        } else {
          data = await fetchNoticeList();
        }
        setNotices(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    loadNotices();
  }, [auth, userAddress]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={cx("customNotice__wrapper")}>
      <div className={cx("customNotice__container")}>
        <h2 className={cx("title")}>맞춤 공고</h2>
        <div className={cx("post__container")}>
          {currentPosts().map((notice, index) => {
            const increasePercent = calculateIncreasePercent(
              notice.shop.item.originalHourlyPay,
              notice.hourlyPay
            );

            return (
              <Link
                href={`/notices/${notice.shop.item.id}/${notice.id}`}
                key={notice.id}
              >
                <Post
                  startsAt={notice.startsAt}
                  workhour={notice.workhour}
                  increasePercent={increasePercent}
                  shopName={notice.shop.item.name}
                  shopAddress1={notice.shop.item.address1}
                  shopImageUrl={notice.shop.item.imageUrl}
                  hourlyPay={notice.hourlyPay}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomNoticeList;
