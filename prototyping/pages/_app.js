import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";

// Support SSR for webcam component in scan.js
if (typeof window === "undefined") global.window = {};
if (typeof global.navigator === "undefined") global.navigator = {};

function LedgerApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default LedgerApp;
