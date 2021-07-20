import { StoreFactory, useCustomStore } from '@auth-demo/custom-store';

export type AuthStoreType = {
	isLoggedIn: boolean;
	token?: string | null;
};

const authStoreIntialState: AuthStoreType = {
	isLoggedIn: false,
	token: null,
};

export const authStore = StoreFactory(authStoreIntialState);
export const useAuthStore = () => useCustomStore(authStore);
