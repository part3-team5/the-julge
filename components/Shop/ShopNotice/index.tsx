import React, { useEffect, useRef, useState } from "react";
import styles from "./ShopNotice.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/Button";
import Post from "@/components/Post";
import { useRecoilValue } from "recoil";
import { employerAtom } from "@/atoms/employerAtom";
import { getMyNoticeList } from "@/api/notice";
import { INoticeWithShopData } from "@/types/Notice";
import { NoticeEmptyProps } from "./ShopNotice.types";
import { calculateIncreasePercent } from "@/utils/calculateIncreasePercent";

const cx = classNames.bind(styles);

const ShopNotice = ({ onClick }: NoticeEmptyProps) => {
  const targetRef = useRef(null);
  const [hasNextData, setHasNextData] = useState(false);
  const [offest, setOffset] = useState();
  const shopValue = useRecoilValue(employerAtom);
  const [postList, setPostList] = useState<INoticeWithShopData[]>([]);

  useEffect(() => {
    if (!shopValue) return;
    handleGetMyNoticeList(shopValue.shopId);
  }, [shopValue]);

  useEffect(() => {
    if (!targetRef.current || !shopValue) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextData) {
          handleGetMyNoticeList(shopValue.shopId);
        }
      },
      { threshold: 0 }
    );

    observer.observe(targetRef.current);

    if (!hasNextData) observer.unobserve(targetRef.current);

    return () => observer.disconnect();
  }, [targetRef, hasNextData]);

  const handleGetMyNoticeList = async (shopId: string) => {
    // const formData = new FormData();
    // formData.append("shopId", shopId);

    const result = await getMyNoticeList(shopId, offest);
    const resultNoticeList = result.items.map(
      (element: { item: INoticeWithShopData; links: any[] }) => {
        element.item.shop = {
          id: shopValue.shopId,
          name: shopValue.name,
          category: shopValue.category,
          address1: shopValue.address1,
          address2: shopValue.address2,
          description: shopValue.description,
          imageUrl: shopValue.imageUrl,
          originalHourlyPay: shopValue.originalHourlyPay,
        };
        return element.item;
      }
    );

    setPostList((prev) => {
      return [...prev, ...resultNoticeList];
    });
    setHasNextData(result.hasNext);
    console.log("result.offset + result.limit::", result.offset + result.limit);
    setOffset(result.offset + result.limit);
  };
  console.log(postList);

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>등록한 공고</h1>
      </div>
      {/* <div className={cx("notice")}>
        <div className={cx("notice-wrapper")}>
          <p>공고를 등록해 보세요.</p>
          <Button btnColorType="orange" btnCustom="userNoticeDetailed" onClick={onClick}>
            공고 등록하기
          </Button>
        </div>
      </div> */}
      <div className={cx("my-notice-list")}>
        {postList.map((item) => {
          const increasePercent = calculateIncreasePercent(
            item.shop?.originalHourlyPay,
            item.hourlyPay
          );

          return (
            <Post
              key={item.id}
              startsAt={item.startsAt}
              workhour={item.workhour}
              increasePercent={increasePercent}
              shopName={item.shop?.name}
              shopAddress1={item.shop?.address1}
              hourlyPay={item.hourlyPay}
              shopImageUrl={item.shop?.imageUrl}
            />
          );
        })}
      </div>
      {hasNextData && <div ref={targetRef}>엔드포인트</div>}
    </div>
  );
};

export default ShopNotice;
