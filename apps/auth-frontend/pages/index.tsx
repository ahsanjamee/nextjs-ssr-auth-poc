import { NextPage } from 'next';
import { selfAPI, SelfResponse } from '../modules/api/self';
import { WithAuth } from '../modules/auth/withAuth';

type Props = {
	data: SelfResponse;
};

const Index: NextPage<Props> = ({ data: { id, name } }) => {
	return (
		<div>
			<h1>This is a Protected Page</h1>
			<h3>Your name is {name}</h3>
			<h3>Your ID is {id}</h3>
		</div>
	);
};

Index.getInitialProps = async (ctx) => {
	const data = await selfAPI.getSelf();
	return { data };
};

export default WithAuth(Index);
