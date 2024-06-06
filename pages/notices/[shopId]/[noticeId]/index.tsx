import styles from "./DetailedNotice.module.scss";
import classNames from "classnames/bind";
import { posts } from "@/public/postTest";
import Post from "@/components/Post";
import NoticeDetailed from "@/components/notice/NoticeDetailed";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getNoticeDetailedData } from "@/api/notice";
import getStringValue from "@/utils/getStringValue";
import { INoticeData } from "@/types/NoticeDetail";

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

  useEffect(() => {
    if (shopId && noticeId) {
      const handleGetData = async () => {
        const data = await getNoticeDetailedData(
          getStringValue(shopId),
          getStringValue(noticeId)
        );

        if (data) {
          console.log(data.item);
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

  return (
    <>
      <div className={cx("content-wrap")}>
        <NoticeDetailed shopData={noticeShopData} />

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
