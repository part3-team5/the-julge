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

const cx = classNames.bind(styles);

const ShopNotice = ({ onClick }: NoticeEmptyProps) => {
  const [target, setTarget] = useState(null);
  const shopValue = useRecoilValue(employerAtom);
  const [postList, setPostList] = useState<INoticeWithShopData[]>([]);

  // useEffect(() => {
  //   if (!target) return;
  //   let observer = new IntersectionObserver(handleAddList, { threshold: 0 });

  //   observer.observe(target);
  // }
  // );
  // }, [target]);

  useEffect(() => {
    if (!shopValue) return;
    handleGetMyNoticeList(shopValue.shopId);
  }, [shopValue]);

  const handleGetMyNoticeList = async (shopId: string) => {
    // const formData = new FormData();
    // formData.append("shopId", shopId);

    const result = await getMyNoticeList(shopId);

    const resultNoticeList = result.data.items.map(
      (element: { item: INoticeWithShopData; links: any[] }) => {
        //       element.item.shop = {
        //         id: string;
        // name: string;
        // category: string;
        // address1: string;
        // address2: string;
        // description: string;
        // imageUrl: string;
        // originalHourlyPay: number;
        //       }
        return element.item;
      }
    );
    console.log(resultNoticeList);
    setPostList((prev) => {
      return [...prev, resultNoticeList];
    });
  };

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
        {/* {postList.map((item) => {
          return (
            <Post
              key={item.id}
              startsAt={item.startsAt}
              workhour={item.workhour}
              increasePercent={item.}
              shopName={item.}
              shopAddress1={item.}
              hourlyPay={item.hourlyPay}
            />
          );
        })} */}
      </div>
      {/* <div ref={setTarget}>엔드포인트</div> */}
    </div>
  );
};

export default ShopNotice;
