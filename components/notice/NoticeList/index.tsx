import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Post from "@/components/Post";
import DropdownSmall from "@/components/DropdownSmall";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import styles from "./NoticeList.module.scss";
import classNames from "classnames/bind";
import { NoticeItem } from "@/types/types";
import { fetchNoticeList } from "@/api/NoticeList";
import Spinner from "@/components/Spinner";
import { calculateIncreasePercent } from "@/utils/calculateIncreasePercent";
import Link from "next/link";

const cx = classNames.bind(styles);

const NoticeList: React.FC = () => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [filteredAndSortedNotices, setFilteredAndSortedNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("time");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [minPay, setMinPay] = useState<number | null>(null);

  const sortNotices = (notices: NoticeItem[], option: string): NoticeItem[] => {
    switch (option) {
      case "pay":
        return [...notices].sort((a, b) => b.hourlyPay - a.hourlyPay);
      case "hour":
        return [...notices].sort((a, b) => a.workhour - b.workhour);
      case "shop":
        return [...notices].sort((a, b) => a.shop.item.name.localeCompare(b.shop.item.name));
      case "new":
        return [...notices].sort(
          (a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime()
        );
      case "time":
      default:
        return [...notices].sort(
          (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
        );
    }
  };

  const filterAndSortNotices = () => {
    let filtered = [...notices];

    if (selectedLocations.length > 0) {
      filtered = filtered.filter((notice) => selectedLocations.includes(notice.shop.item.address1));
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (notice) => new Date(notice.startsAt).getTime() >= selectedDate.getTime()
      );
    }

    if (minPay !== null) {
      filtered = filtered.filter((notice) => notice.hourlyPay >= minPay);
    }

    const sorted = sortNotices(filtered, sortOption);
    setFilteredAndSortedNotices(sorted);
  };

  const router = useRouter();
  const { page = 1 } = router.query;
  const currentPage = parseInt(page as string, 10);
  const postsPerPage = 6;

  const handleOpenFilter = () => {
    setIsFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  const handleApplyFilter = (locations: string[], date: Date | null, pay: number | null) => {
    setSelectedLocations(locations);
    setSelectedDate(date);
    setMinPay(pay);
    setIsFilterOpen(false);
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredAndSortedNotices.slice(startIndex, endIndex);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await fetchNoticeList();
        setNotices(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    loadNotices();
  }, [filteredAndSortedNotices]);

  useEffect(() => {
    filterAndSortNotices();
  }, [sortOption, selectedLocations, selectedDate, minPay, notices]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={cx("notice__wrapper")}>
      <div className={cx("notice__container")}>
        <div className={cx("noticeTitle__container")}>
          <h2 className={cx("title")}>전체 공고</h2>
          <div className={cx("noticeTitle__options")}>
            <DropdownSmall onOptionSelect={setSortOption} />
            <div className={cx("filter__wrapper")}>
              <button className={cx("filter__btn")} onClick={handleOpenFilter}>
                상세 필터
              </button>
              {isFilterOpen && (
                <Filter onClose={handleCloseFilter} onApplyFilter={handleApplyFilter} />
              )}
            </div>
          </div>
        </div>
        <div className={cx("post__grid")}>
          {currentPosts.map((notice, index) => {
            const increasePercent = calculateIncreasePercent(
              notice.shop.item.originalHourlyPay,
              notice.hourlyPay
            );

            return (
              <Link key={notice.id} href={`/notices/${notice.shop.item.id}/${notice.id}`}>
                <Post
                  key={notice.id}
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
        <Pagination
          currentPage={currentPage}
          totalPosts={filteredAndSortedNotices.length}
          postsPerPage={postsPerPage}
          type="notice"
        />
      </div>
    </div>
  );
};

export default NoticeList;
