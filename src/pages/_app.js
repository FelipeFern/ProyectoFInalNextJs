import { AuthProvider } from '@/common/context/AuthContext';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
