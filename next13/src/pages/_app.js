import Layout from '@/components/Layout';
import '@/styles/globals.css';
import '@/styles/codeHighlightColors.css';
import '@/styles/scrollStyle.css';
import '@/styles/listStyle.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
