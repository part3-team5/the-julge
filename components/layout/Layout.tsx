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
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
