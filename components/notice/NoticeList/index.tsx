// 메인 화면 공고 목록 컴포넌트
import Post from "@/components/Post";
import styles from "./NoticeList.module.scss";
import classNames from "classnames/bind";
import DropdownSmall from "@/components/DropdownSmall";

const cx = classNames.bind(styles);

const NoticeList = () => {
    const posts = [
        { startsAt: "2024-06-30T00:00:00Z", workhour: 1 },
        { startsAt: "2024-05-31T00:00:00Z", workhour: 5 },
        { startsAt: "2024-07-31T00:00:00Z", workhour: 5 },
        { startsAt: "2024-07-31T00:00:00Z", workhour: 5 },
        { startsAt: "2021-07-31T00:00:00Z", workhour: 5 },
        { startsAt: "2022-07-31T00:00:00Z", workhour: 5 },
    ];

    return (
        <div className={cx("notice__wrapper")}>
            <div className={cx("notice__container")}>
                <div className={cx("noticeTitle__container")}>
                    <h2 className={cx("title")}>전체 공고</h2>
                    <div className={cx("noticeTitle__options")}>
                        <DropdownSmall />
                        <button className={cx("filter__btn")}>상세 필터</button>
                    </div>
                </div>
                <div className={cx("post__grid")}>
                    {posts.map((post, index) => (
                        <Post key={index} startsAt={post.startsAt} workhour={post.workhour} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NoticeList;
