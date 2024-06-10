import PostNotice from "@/api/data";
import CustomNoticeList from "@/components/notice/CustomNoticeList";
import NoticeList from "@/components/notice/NoticeList";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <CustomNoticeList />
      <PostNotice />
      <NoticeList />
    </>
  );
}
