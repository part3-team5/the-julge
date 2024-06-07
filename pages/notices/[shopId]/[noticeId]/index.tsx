import styles from "./DetailedNotice.module.scss";
import classNames from "classnames/bind";
import Post from "@/components/Post";
import NoticeDetailed from "@/components/notice/NoticeDetailed";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getNoticeDetailedData } from "@/api/notice";
import getStringValue from "@/utils/getStringValue";
import { INoticeData } from "@/types/NoticeDetail";
import { calculateIncreasePercent } from "@/utils/calculateIncreasePercent";

const cx = classNames.bind(styles);

const DetailedNotice = () => {
  const router = useRouter();
  const { shopId, noticeId } = router.query;
  const [noticeShopData, setNoticeShopData] = useState<INoticeData>({
    closed: false,
    description: "",
    hourlyPay: 0,
    id: "",
    startsAt: "",
    workhour: 0,
    shop: {
      address1: "",
      address2: "",
      category: "",
      description: "",
      id: "",
      imageUrl: "",
      name: "",
      originalHourlyPay: 0,
    },
  });
  const [storageNoticeList, setStorageNoticeList] = useState<INoticeData[]>([]);

  useEffect(() => {
    if (shopId && noticeId) {
      const handleGetData = async () => {
        const data = await getNoticeDetailedData(
          getStringValue(shopId),
          getStringValue(noticeId)
        );

        if (data) {
          const result = data.item;
          setNoticeShopData({
            closed: result.closed,
            description: result.description,
            hourlyPay: result.hourlyPay,
            id: result.id,
            startsAt: result.startsAt,
            workhour: result.workhour,
            shop: {
              address1: result.shop.item.address1,
              address2: result.shop.item.address2,
              category: result.shop.item.category,
              description: result.shop.item.description,
              id: result.shop.item.id,
              imageUrl: result.shop.item.imageUrl,
              name: result.shop.item.name,
              originalHourlyPay: result.shop.item.originalHourlyPay,
            },
          });
        }
      };

      handleGetData();
    }
  }, [shopId, noticeId]);

  useEffect(() => {
    if (noticeShopData.id) {
      let recentlyNoticeList: INoticeData[] = [];
      const storageNoticeData = localStorage.getItem("RECENTLY_NOTICE_LIST");

      if (storageNoticeData) {
        recentlyNoticeList = JSON.parse(storageNoticeData) as INoticeData[];
      }

      const isDuplicate = recentlyNoticeList.some(
        (item) => item.id === noticeShopData.id
      );

      if (!isDuplicate) {
        recentlyNoticeList.push(noticeShopData);
        if (recentlyNoticeList.length > 6) {
          recentlyNoticeList = recentlyNoticeList.slice(-6);
        }

        localStorage.setItem(
          "RECENTLY_NOTICE_LIST",
          JSON.stringify(recentlyNoticeList)
        );
      }
      setStorageNoticeList((prev) => {
        return [...prev, ...recentlyNoticeList];
      });
    }
  }, [noticeShopData]);

  return (
    <>
      <div className={cx("content-wrap")}>
        <NoticeDetailed shopData={noticeShopData} />

        <section className={cx("recentlt-viewed")}>
          <h2 className={cx("notice--head__name")}>최근에 본 공고</h2>
          <div className={cx("post__grid")}>
            {storageNoticeList
              .slice(0)
              .reverse()
              .map((notice) => {
                const increasePercent = calculateIncreasePercent(
                  notice.shop.originalHourlyPay,
                  notice.hourlyPay
                );

                return (
                  <Post
                    key={notice.id}
                    startsAt={notice.startsAt}
                    workhour={notice.workhour}
                    increasePercent={increasePercent}
                    shopName={notice.shop.name}
                    shopAddress1={notice.shop.address1}
                    shopImageUrl={notice.shop.imageUrl}
                    hourlyPay={notice.hourlyPay}
                  />
                );
              })}
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailedNotice;
