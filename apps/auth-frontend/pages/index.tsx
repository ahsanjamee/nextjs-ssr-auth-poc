import styled from 'styled-components';
import { destroyCookie } from 'nookies';
import { useAuthStore, authStore } from '../modules/stores';
import { GetServerSideProps, NextPage } from 'next';
import { WithAuth } from '../modules/auth/withAuth';

const Index: NextPage = () => {
	const { isLoggedIn, token } = useAuthStore();
	const handleLogout = () => {
		authStore.setBatch({ isLoggedIn: false, token: null });
		destroyCookie(null, 'token');
	};
	return (
		<StyledPage>
			<h1>
				is Logged in: {String(isLoggedIn)} , Token: {token}
			</h1>
			{isLoggedIn && <button onClick={handleLogout}>logout</button>}
			<h3>server side prop: </h3>
		</StyledPage>
	);
};

const StyledPage = styled.main``;

export default WithAuth(Index);
