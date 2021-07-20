import { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import { ReactComponent as NxLogo } from '../public/nx-logo-white.svg';
import './styles.css';
import { authStore } from '../stores';
import { parseCookies } from 'nookies';

type ExtendedAppProps = AppProps & { isLoggedIn: boolean; token: string | null };

function CustomApp({ Component, pageProps, isLoggedIn, token }: ExtendedAppProps) {
	authStore.hydrate({ isLoggedIn, token });
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
	const appProps = await App.getInitialProps(appContext);
	const cookies = parseCookies(appContext.ctx);
	if (cookies.token) {
		return { ...appProps, isLoggedIn: true, token: cookies.token };
	}
	return { ...appProps, isLoggedIn: false, token: null };
};
export default CustomApp;
