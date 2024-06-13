import { ReactNode } from "react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import style from "./Layout.module.scss";

type Children = {
    children: ReactNode;
};
export default function Layout({ children }: Children) {
    return (
        <>
            <div className={style.wrap}>
                <Header />
                <div className={style.body}>{children}</div>
                <Footer />
            </div>
        </>
    );
}
