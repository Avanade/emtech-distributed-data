import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import Layout from "@/components/Layout";

export default function LedgerApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
