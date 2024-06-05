import { ReactNode } from "react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

interface AppProps {
  children: ReactNode;
}

const Layout: React.FC<AppProps> = ({ children }) => {
  const [user, setUser] = useState<
    "guest" | "employee" | "employer" | undefined
  >("guest");
  return (
    <>
      <Header userType={user} />
      <button onClick={() => setUser("guest")}>로그인하지 않음</button>
      <button onClick={() => setUser("employee")}>알바</button>
      <button onClick={() => setUser("employer")}>사장</button>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
