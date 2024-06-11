import { ReactNode } from "react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Children = {
  children: ReactNode;
};
export default function Layout({ children }: Children) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
