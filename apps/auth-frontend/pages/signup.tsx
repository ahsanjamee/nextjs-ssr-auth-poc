import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { FormEventHandler, useEffect } from 'react';
import { LoginForm } from '../components/LoginForm';
import { authAPI } from '../modules/api';
import { authStore, useAuthStore } from '../modules/stores';
import Link from 'next/link';
import { LinkTo } from '../components/LinkTo';

const SignUp: NextPage = () => {
	const { isLoggedIn } = useAuthStore();
	const router = useRouter();

	const handleCreateUser: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		await authAPI.signUp({
			name: formData.get('name') as string,
			password: formData.get('password') as string,
		});
		router.push('/login');
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
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Create an Account</h2>
					</div>
					<LoginForm handleSubmit={handleCreateUser} />
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

SignUp.getInitialProps = (ctx) => {
	if (authStore.getState().isLoggedIn) redirect(ctx);
	return {};
};

export default SignUp;
