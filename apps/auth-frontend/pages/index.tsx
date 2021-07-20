import styled from 'styled-components';
import { authStore, useAuthStore } from '../stores';
import { setCookie, destroyCookie } from 'nookies';

const StyledPage = styled.div`
	.page {
	}
`;

export function Index() {
	const { isLoggedIn } = useAuthStore();

	const handleLogin = () => {
		authStore.setToken('123');
		authStore.setIsLoggedIn(true);
		setCookie(null, 'token', '123');
	};
	const handleLogout = () => {
		authStore.setToken(null);
		authStore.setIsLoggedIn(false);
		destroyCookie(null, 'token');
	};
	return (
		<StyledPage>
			<h1>is Logged in: {String(isLoggedIn)}</h1>
			{!isLoggedIn && <button onClick={handleLogin}>login</button>}
			{isLoggedIn && <button onClick={handleLogout}>logout</button>}
		</StyledPage>
	);
}

export default Index;
