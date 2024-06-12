import CustomNoticeList from "@/components/notice/CustomNoticeList";
import NoticeList from "@/components/notice/NoticeList";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import useCookie from "@/hooks/useCookies";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const keyword = router.query.keyword as string;
  const page = parseInt(router.query.page as string, 10);
  const { id, userType, isSuccess } = useCookie();

  return (
    isSuccess && (
      <>
        <CustomNoticeList />
        <NoticeList />
      </>
    )
  );
}
