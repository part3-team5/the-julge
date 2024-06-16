import CustomNoticeList from "@/components/notice/CustomNoticeList";
import NoticeList from "@/components/notice/NoticeList";
import useCookie from "@/hooks/useCookies";

export default function Home() {
  const { isSuccess } = useCookie();

  return (
    isSuccess && (
      <>
        <CustomNoticeList />
        <NoticeList />
      </>
    )
  );
}
