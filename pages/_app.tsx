import "@/styles/globals.css";
import "@/styles/reset.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { RecoilRoot } from "recoil";
import Modal from "@/components/Modal";

export default function App({ Component, pageProps }: AppProps) {
  let childContent: React.ReactNode;
  switch (pageProps.layoutType) {
    case "removeLayout":
      childContent = <Component {...pageProps} />;
      break;
    default:
      childContent = (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
      break;
  }

  return (
    <RecoilRoot>
      {childContent}
      <Modal />
    </RecoilRoot>
  );
}
