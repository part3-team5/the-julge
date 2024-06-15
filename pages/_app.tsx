import "@/styles/globals.css";
import "@/styles/reset.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { RecoilRoot } from "recoil";
import Modal from "@/components/Modal";
import { ToastProvider } from "@/components/Toast/ToastConenxt";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import UserInitializer from "@/components/AtomInit";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      retryDelay: 3000,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [initialized, setInitialized] = useState(false);

  const handleInitialized = () => {
    setInitialized(true);
  };

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
    <>
      <Head>
        <title>더 줄게 - thejulge</title>
        <meta
          name="description"
          content="급하게 일손이 필요한 자리에 더 많은 시급을 제공해서 아르바이트생을 구할 수 있는 서비스입니다."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="더 줄게 - thejulge" />
        <meta
          property="og:description"
          content="급하게 일손이 필요한 자리에 더 많은 시급을 제공해서 아르바이트생을 구할 수 있는 서비스입니다."
        />
        <meta property="og:image" content="/image/logo_large.svg" />
        <meta property="og:url" content="https://the-julge-5.vercel.app/" />
      </Head>

      <RecoilRoot>
        <UserInitializer onInitialized={handleInitialized} />
        {initialized ? (
          <ToastProvider>
            <QueryClientProvider client={queryClient}>
              {childContent}
              <Modal />
            </QueryClientProvider>
          </ToastProvider>
        ) : (
          <div></div>
        )}
      </RecoilRoot>
    </>
  );
}
