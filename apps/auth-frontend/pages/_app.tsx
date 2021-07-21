import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { Header } from '../components/Header';
import { authStore, AuthStoreType, useAuthStore } from '../modules/stores';
import './styles.css';

type ExtendedAppProps = AppProps & { authStore: AuthStoreType };

function CustomApp({ Component, pageProps, authStore: authStoreHydrateValue }: ExtendedAppProps) {
	authStore.hydrate(authStoreHydrateValue);
	const { isLoggedIn } = useAuthStore();
	return (
		<>
			<Head>
				<title>Welcome to auth-frontend!</title>
			</Head>
			<div className='app'>
				{isLoggedIn && <Header />}
				<div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
					<Component {...pageProps} />
				</div>
			</div>
		</>
	);
}

CustomApp.getInitialProps = async (appContext: AppContext) => {
	const cookies = parseCookies(appContext.ctx);
	if (cookies?.token && cookies?.token !== '') {
		authStore.setBatch((state) => {
			return { ...state, isLoggedIn: true, token: cookies.token };
		});
	}
	const appProps = await App.getInitialProps(appContext);
	console.log(authStore.getState());
	return { ...appProps, authStore: authStore.getState() };
};
export default CustomApp;
