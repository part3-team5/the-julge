import PostNotice from "@/api/data";
import CustomNoticeList from "@/components/notice/CustomNoticeList";
import NoticeList from "@/components/notice/NoticeList";

export default function Home() {
  return (
    <>
      <CustomNoticeList />
      <PostNotice />
      <NoticeList />
    </>
  );
}
