import { BaseAPI } from '@auth-demo/api-client';

type CreateUserDTO = {
	name: string;
	password: string;
};

type CreateUserResponse = CreateUserDTO & {
	id: string;
};

export class AuthAPI extends BaseAPI {
	signUp(body: CreateUserDTO) {
		return this.post<CreateUserResponse>('user/sign-up', body);
	}

	login(body: CreateUserDTO) {
		return this.post<{ token: string | null }>('user/login', body);
	}
}

export const authAPI = new AuthAPI('http://localhost:3333');
