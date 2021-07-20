import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { setCookie } from 'nookies';
import { useEffect } from 'react';
import { authStore, useAuthStore } from '../modules/stores';
import './login.module.css';

const Login: NextPage = () => {
	const { isLoggedIn } = useAuthStore();
	const router = useRouter();
	const handleLogin = () => {
		setCookie(null, 'token', '123');
		authStore.setBatch({ isLoggedIn: true, token: '123' });
	};

	useEffect(() => {
		if (isLoggedIn) {
			router.push('/');
		}
	}, [isLoggedIn, router]);

	return (
		<div>
			<h1>Welcome to login!</h1>
			{!isLoggedIn && <button onClick={handleLogin}>login</button>}
		</div>
	);
};

const redirect = (ctx: NextPageContext) => {
	if (!ctx.res) return;
	ctx.res.writeHead(302, { location: '/login' });
	ctx.res.end();
};

Login.getInitialProps = (ctx) => {
	if (!authStore.getState().isLoggedIn) redirect(ctx);
	return {};
};

export default Login;
