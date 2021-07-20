import { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import { ReactComponent as NxLogo } from '../public/nx-logo-white.svg';
import './styles.css';
import { authStore, AuthStoreType } from '../modules/stores';
import { parseCookies } from 'nookies';
type ExtendedAppProps = AppProps & { authStore: AuthStoreType };

function CustomApp({ Component, pageProps, authStore: authStoreHydrateValue }: ExtendedAppProps) {
	authStore.hydrate(authStoreHydrateValue);
	return (
		<>
			<Head>
				<title>Welcome to auth-frontend!</title>
			</Head>
			<div className='app'>
				<header className='flex'>
					<NxLogo width='75' height='50' />
					<h1>Welcome to auth-frontend!</h1>
				</header>
				<main>
					<Component {...pageProps} />
				</main>
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
	return { ...appProps, authStore: authStore.getState() };
};
export default CustomApp;
