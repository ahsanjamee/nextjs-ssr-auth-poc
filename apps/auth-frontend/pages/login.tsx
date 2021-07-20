import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { setCookie } from 'nookies';
import { useEffect } from 'react';
import { authAPI } from '../modules/api';
import { authStore, useAuthStore } from '../modules/stores';
import './login.module.css';

const Login: NextPage = () => {
	const { isLoggedIn } = useAuthStore();
	const router = useRouter();

	const handleLogin = async () => {
		const res = await authAPI.login({ name: 'string', password: 'string' });
		if (res.token) {
			authStore.setBatch({ isLoggedIn: true, token: res.token });
			setCookie(null, 'token', res.token);
			return;
		}
		alert('Invalid Username or Password');
	};

	const handleCreateUser = async () => {
		const data = await authAPI.signUp({ name: 'string', password: 'string' });
		console.log(data);
	};

	useEffect(() => {
		if (isLoggedIn) {
			router.push('/');
		}
	}, [isLoggedIn, router]);

	return (
		<div>
			<h1>Welcome to login!</h1>
			<button onClick={handleLogin}>login</button>
			<button onClick={handleCreateUser}>create user</button>
		</div>
	);
};

const redirect = (ctx: NextPageContext) => {
	if (!ctx.res) return;
	ctx.res.writeHead(302, { location: '/' });
	ctx.res.end();
};

Login.getInitialProps = (ctx) => {
	if (authStore.getState().isLoggedIn) redirect(ctx);
	return {};
};

export default Login;
