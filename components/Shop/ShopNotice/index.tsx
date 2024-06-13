import React, { useEffect, useRef, useState, useCallback } from "react";
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
import Link from "next/link";
import Spinner from "@/components/Spinner";

const cx = classNames.bind(styles);

const ShopNotice = ({ onClick }: NoticeEmptyProps) => {
  const targetRef = useRef(null);
  const [hasNextData, setHasNextData] = useState(false);
  const [offset, setOffset] = useState(0);
  const shopValue = useRecoilValue(employerAtom);
  const [postList, setPostList] = useState<INoticeWithShopData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleGetMyNoticeList = useCallback(
    async (shopId: string, currentOffset: number) => {
      try {
        setLoading(true);
        const result = await getMyNoticeList(shopId, currentOffset);
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
        setOffset((prevOffset) => prevOffset + result.limit);
      } catch (e) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    },
    [shopValue]
  );

  useEffect(() => {
    if (!shopValue) return;
    handleGetMyNoticeList(shopValue.shopId, offset);
  }, [shopValue, offset, handleGetMyNoticeList]);

  useEffect(() => {
    if (!targetRef.current || !shopValue) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextData) {
          handleGetMyNoticeList(shopValue.shopId, offset);
        }
      },
      { threshold: 0 }
    );

    observer.observe(targetRef.current);

    if (!hasNextData) observer.unobserve(targetRef.current);

    return () => observer.disconnect();
  }, [targetRef, hasNextData, offset, shopValue, handleGetMyNoticeList]);

  return (
    <div className={cx("section")}>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <h1 className={cx("title")}>등록한 공고</h1>
        </div>
        {postList.length === 0 && (
          <div className={cx("notice")}>
            <div className={cx("notice-wrapper")}>
              <p>공고를 등록해 보세요.</p>
              <Button
                btnColorType="orange"
                btnCustom="userNoticeDetailed"
                onClick={onClick}
              >
                공고 등록하기
              </Button>
            </div>
          </div>
        )}
        <div className={cx("my-notice-list")}>
          {postList.map((item, i) => {
            const increasePercent = calculateIncreasePercent(
              item.shop?.originalHourlyPay,
              item.hourlyPay
            );

            return (
              <Link key={i} href={`/my-shop/${item.id}`}>
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
              </Link>
            );
          })}
        </div>

        {/* {loading && <Spinner />}
      {hasNextData && <div ref={targetRef} />}
      {error && <div>{error}</div>} */}
      </div>
    </div>
  );
};

export default ShopNotice;
