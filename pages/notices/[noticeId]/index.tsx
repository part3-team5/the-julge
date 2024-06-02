import Image from "next/image";
import styles from "./DetailedNotice.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/Button";
import sampleImg from "@/public/image/sample.jpg";
import clockIcon from "@/public/image/icon/clock-icon.svg";
import pathIcon from "@/public/image/icon/path-icon.svg";
import HourlyPayincreaseButton from "@/components/HourlyPayincreaseButton";
import { posts } from "@/public/postTest";
import Post from "@/components/Post";

const cx = classNames.bind(styles);

const DetailedNotice = () => {
  return (
    <>
      <div className={cx("content-wrap")}>
        <section className={cx("notice")}>
          <div className={cx("notice--head")}>
            <span className={cx("notice__category")}>식당</span>
            <h2 className={cx("notice--head__name")}>도토리 식당</h2>
          </div>
          <div className={cx("notice-info")}>
            <div className={cx("notice-info__img")}>
              <Image
                fill
                style={{
                  objectFit: "cover",
                }}
                src={sampleImg}
                alt="가게 이미지"
              />
            </div>

            <div className={cx("notice-info--detail-wrap")}>
              <div className={cx("notice-info--detail")}>
                <div className={cx("notice-info--detail__salary")}>
                  <span className={cx("notice__category")}>시급</span>
                  <div className={cx("notice-info__salary-wrap")}>
                    <span className={cx("notice-info__salary")}>15,000원</span>
                    <div>
                      <HourlyPayincreaseButton
                        isPast={false}
                        increasePercent={50}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx("with-icon-wrap")}>
                  <Image src={clockIcon} alt="시계 아이콘" />
                  <span>2023.01.02 15:00~18:00 (3시간)</span>
                </div>
                <div className={cx("with-icon-wrap")}>
                  <Image src={pathIcon} alt="위치 아이콘" />
                  <span>서울시 송파구</span>
                </div>
                <p className={cx("notice-info__intro")}>
                  알바하기 편한 너구리네 라면집!
                  <br /> 라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는
                  가게입니다.
                </p>
              </div>
              <Button btnColorType="orenge">신청하기</Button>
            </div>
          </div>

          <div className={cx("notice-info--explain")}>
            <span className={cx("notice-info--explain__title")}>공고 설명</span>
            <p className={cx("notice-info--explain__content")}>
              기존 알바 친구가 그만둬서 새로운 친구를 구했는데, 그 사이에 하루가
              비네요. <br />
              급해서 시급도 높였고 그렇게 바쁜 날이 아니라서 괜찮을거예요.
            </p>
          </div>
        </section>

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
