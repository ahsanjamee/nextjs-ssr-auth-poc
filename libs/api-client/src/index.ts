type File = {
	file: Blob | Blob[];
	key: string;
};

export class BaseAPI {
	private get defaultHeaders() {
		if (this.getToken) {
			return { 'content-type': 'application/json', token: `Bearer ${this.getToken()}` };
		}
		return { 'content-type': 'application/json', token: '' };
	}

	protected handleUnAuthorized: (() => void) | null = null;
	protected getToken: (() => void) | null = null;

	constructor(private baseURL: string) {}

	protected async get<T>(endpoint: string, headers: { [key: string]: string } = {}) {
		const res = await fetch(`${this.baseURL}/${endpoint}`, {
			headers,
		});
		return (await res.json()) as T;
	}

	protected async post<T>(
		endpoint: string,
		body: Record<string, unknown> = {},
		headers: { [key: string]: string } = {},
	) {
		const res = await fetch(`${this.baseURL}/${endpoint}`, {
			headers: { ...headers, ...this.defaultHeaders },
			method: 'POST',
			body: JSON.stringify(body),
		});
		if (res.status === 401 && this.handleUnAuthorized) this.handleUnAuthorized();
		return (await res.json()) as T;
	}

	protected async put<T>(
		endpoint: string,
		body: Record<string, unknown> = {},
		headers: { [key: string]: string } = {},
	) {
		const res = await fetch(`${this.baseURL}/${endpoint}`, {
			headers: { ...headers, ...this.defaultHeaders },
			method: 'PUT',
			body: JSON.stringify(body),
		});
		if (res.status === 401 && this.handleUnAuthorized) this.handleUnAuthorized();
		return (await res.json()) as T;
	}

	protected async patch<T>(
		endpoint: string,
		body: Record<string, unknown> = {},
		headers: { [key: string]: string } = {},
	) {
		const res = await fetch(`${this.baseURL}/${endpoint}`, {
			headers: { ...headers, ...this.defaultHeaders },
			method: 'PATCH',
			body: JSON.stringify(body),
		});
		if (res.status === 401 && this.handleUnAuthorized) this.handleUnAuthorized();
		return (await res.json()) as T;
	}

	protected async delete<T>(
		endpoint: string,
		body: Record<string, unknown> = {},
		headers: { [key: string]: string } = {},
	) {
		const res = await fetch(`${this.baseURL}/${endpoint}`, {
			headers: { ...headers, ...this.defaultHeaders },
			method: 'DELETE',
			body: JSON.stringify(body),
		});
		if (res.status === 401 && this.handleUnAuthorized) this.handleUnAuthorized();
		return (await res.json()) as T;
	}

	protected async uploadFile<T>(
		endpoint: string,
		file: File,
		body: Record<string, string | string[]> = {},
		headers: { [key: string]: string } = {},
	) {
		const formData = new FormData();
		for (const [key, value] of Object.entries(body)) {
			if (Array.isArray(value)) {
				value.forEach((e) => formData.append(key, e));
			} else {
				formData.set(key, value);
			}
		}
		if (Array.isArray(file.file)) {
			file.file.forEach((e) => {
				formData.append(file.key, e);
			});
		} else {
			formData.set(file.key, file.file);
		}

		const res = await fetch(`${this.baseURL}/${endpoint}`, {
			headers: { ...headers },
			method: 'POST',
			body: formData,
		});
		if (res.status === 401 && this.handleUnAuthorized) this.handleUnAuthorized();
		return (await res.json()) as T;
	}
}

type ProtectedConstructor = {
	getToken: () => string;
	handleLogout: () => void;
};

export class BaseProtectedAPI extends BaseAPI {
	constructor(baseURL: string, { getToken, handleLogout }: ProtectedConstructor) {
		super(baseURL);
		this.getToken = getToken;
		this.handleUnAuthorized = handleLogout;
	}
}
