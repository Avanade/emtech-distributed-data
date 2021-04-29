import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";

// Support SSR for headless UI
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
