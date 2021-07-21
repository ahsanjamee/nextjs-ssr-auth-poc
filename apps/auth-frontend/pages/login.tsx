import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { setCookie } from 'nookies';
import { FormEventHandler, useEffect } from 'react';
import { LoginForm } from '../components/LoginForm';
import { authAPI } from '../modules/api';
import { authStore, useAuthStore } from '../modules/stores';
import Link from 'next/link';
import { LinkTo } from '../components/LinkTo';

const Login: NextPage = () => {
	const { isLoggedIn } = useAuthStore();
	const router = useRouter();

	const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const res = await authAPI.login({
			name: formData.get('name') as string,
			password: formData.get('password') as string,
		});
		if (res.token) {
			authStore.setBatch({ isLoggedIn: true, token: res.token });
			setCookie(null, 'token', res.token);
			return;
		}
		alert('Invalid Username or Password');
	};

	useEffect(() => {
		if (isLoggedIn) {
			router.push('/');
		}
	}, [isLoggedIn, router]);

	return (
		<div>
			<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full space-y-8'>
					<div>
						<img
							className='mx-auto h-12 w-auto'
							src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
							alt='Workflow'
						/>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
					</div>

					<LoginForm handleSubmit={handleLogin} />
					<div>
						<LinkTo
							href='/signup'
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
							Create Account
						</LinkTo>
					</div>
				</div>
			</div>
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
