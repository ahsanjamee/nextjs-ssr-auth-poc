import { BaseProtectedAPI } from '@auth-demo/api-client';
import { authStore } from '../stores';

export type SelfResponse = {
	id: string;
	name: string;
};

export class SelfAPI extends BaseProtectedAPI {
	getSelf() {
		return this.get<SelfResponse>('private');
	}
}

export const selfAPI = new SelfAPI('http://localhost:3333', {
	getToken: () => authStore.getState().token,
	handleLogout: () => authStore.setBatch({ isLoggedIn: false, token: null }),
});
