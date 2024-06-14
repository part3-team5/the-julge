import styles from "./DetailedNotice.module.scss";
import classNames from "classnames/bind";
import Post from "@/components/Post";
import NoticeDetailed from "@/components/notice/NoticeDetailed";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getNoticeDetailedData } from "@/api/notice";
import getStringValue from "@/utils/getStringValue";
import { INoticeData, INoticeWithShopData } from "@/types/Notice";
import { calculateIncreasePercent } from "@/utils/calculateIncreasePercent";
import { useGetDetailedNotice } from "@/hooks/useGetDetailedNotice";
import Link from "next/link";

const cx = classNames.bind(styles);

const DetailedNotice = () => {
  const router = useRouter();
  const { shopId, noticeId } = router.query;
  const { noticeShopData } = useGetDetailedNotice(getStringValue(shopId), getStringValue(noticeId));

  const [storageNoticeList, setStorageNoticeList] = useState<INoticeWithShopData[]>([]);

  useEffect(() => {
    if (noticeShopData.id) {
      let recentlyNoticeList: INoticeWithShopData[] = [];
      const storageNoticeData = localStorage.getItem("RECENTLY_NOTICE_LIST");

      if (storageNoticeData) {
        recentlyNoticeList = JSON.parse(storageNoticeData) as INoticeWithShopData[];
      }

      const isDuplicate = recentlyNoticeList.some((item) => item.id === noticeShopData.id);

      if (!isDuplicate) {
        recentlyNoticeList.push(noticeShopData);
        if (recentlyNoticeList.length > 6) {
          recentlyNoticeList = recentlyNoticeList.slice(-6);
        }

        localStorage.setItem("RECENTLY_NOTICE_LIST", JSON.stringify(recentlyNoticeList));
      }
      setStorageNoticeList((prev) => {
        return [...prev, ...recentlyNoticeList];
      });
    }
  }, [noticeShopData]);

  return (
    <div className={cx("content-wrap")}>
      <div className={cx("container")}>
        <NoticeDetailed shopData={noticeShopData} />

        <section className={cx("recentlt-viewed")}>
          <h2 className={cx("notice--head__name")}>최근에 본 공고</h2>
          <div className={cx("post__grid")}>
            {storageNoticeList
              .slice(0)
              .reverse()
              .map((notice, index) => {
                const increasePercent = calculateIncreasePercent(
                  notice.shop.originalHourlyPay,
                  notice.hourlyPay
                );

                return (
                  <Link key={index} href={`/notices/${notice.shop.id}/${notice.id}`}>
                    <Post
                      key={notice.id}
                      startsAt={notice.startsAt}
                      workhour={notice.workhour}
                      increasePercent={increasePercent}
                      shopName={notice.shop.name}
                      shopAddress1={notice.shop.address1}
                      shopImageUrl={notice.shop.imageUrl}
                      hourlyPay={notice.hourlyPay}
                      closed={notice.closed}
                    />
                  </Link>
                );
              })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailedNotice;
