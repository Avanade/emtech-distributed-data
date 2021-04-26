import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";

function LedgerApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default LedgerApp;
