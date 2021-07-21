import { NextPage } from 'next';
import styled from 'styled-components';
import { selfAPI, SelfResponse } from '../modules/api/self';
import { WithAuth } from '../modules/auth/withAuth';

type Props = {
	data: SelfResponse;
};

const Index: NextPage<Props> = ({ data: { id, name } }) => {
	console.log({ id, name });
	return (
		<StyledPage>
			<h1>This is a Protected Page</h1>
			<h3>Your name is {name}</h3>
			<h3>Your ID is {id}</h3>
		</StyledPage>
	);
};

Index.getInitialProps = async (ctx) => {
	const data = await selfAPI.getSelf();
	console.log(data);
	return { data };
};

const StyledPage = styled.main``;

export default WithAuth(Index);
