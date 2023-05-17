import Dashboard from '@/components/Dashboard';
import { AuthProvider } from '../common/context/AuthContext';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import { BrowserRouter } from 'react-router-dom';

export default function App({ Component, pageProps }) {
	// return (
	//   <AuthProvider>
	//     <Layout>
	//       <Component {...pageProps} />
	//     </Layout>
	//   </AuthProvider>
	// );
	return (
		<BrowserRouter>
			<Dashboard />
		</BrowserRouter>
	);
}
