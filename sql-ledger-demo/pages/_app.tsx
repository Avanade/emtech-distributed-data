import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import Layout from "@/components/Layout";

// Support SSR for webcam component in scan.js
// TODO: Remove these lines if scan continues to work with SSR setup
// if (typeof window === "undefined") global.window = {};
//if (typeof global.navigator === "undefined") global.navigator = {};

export default function LedgerApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
