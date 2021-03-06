import { NextPage, NextPageContext } from 'next';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authStore, useAuthStore } from '../stores';

export const WithAuth = (Component: NextPage) => {
	const Contained = ({ ...props }) => {
		const router = useRouter();
		const { isLoggedIn } = useAuthStore();
		useEffect(() => {
			if (!isLoggedIn) {
				router.push('/login');
			}
		});
		return <Component {...props} />;
	};

	Contained.getInitialProps = async (ctx: NextPageContext) => {
		if (!authStore.getState().isLoggedIn) {
			if (ctx.res) {
				ctx.res.writeHead(302, { location: '/login' });
				ctx.res.end();
			} else {
				await Router.push('/login');
			}
			return {
				a: 1,
			};
		}
		if (Component.getInitialProps) {
			return await Component.getInitialProps(ctx);
		}
		return {};
	};

	return Contained;
};
