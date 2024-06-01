import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import Gnb from "@/components/Gnb";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useState<
    "guest" | "employee" | "employer" | undefined
  >("guest");
  return (
    <>
      <Gnb userType={user} />
      <button onClick={() => setUser("guest")}>로그인하지 않음</button>
      <button onClick={() => setUser("employee")}>알바</button>
      <button onClick={() => setUser("employer")}>사장</button>
    </>
  );
}

// 인풋 컴포넌트 테스트
