import { useEffect, useState } from 'react';

type SetTypeArg<T> = T | ((val: T) => T);

type SetType<T> = (val: T | ((val: T) => T)) => void;

type SetterType<T> = {
	[Property in keyof T as `set${Capitalize<string & Property>}`]: (
		val: T[Property] | ((val: T[Property]) => T[Property]),
	) => void;
};

type StoreType<T> = {
	hydrate: SetType<T>;
	subscribe(cb: (val: T) => void): () => void;
	getState(): T;
};

type ReturnStoreType<T> = StoreType<T> & SetterType<T>;

class Container {}
interface Container {
	[key: string]: unknown;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.substring(1);

export const StoreFactory = <T extends Record<string, unknown>>(initialState: T): ReturnStoreType<T> => {
	class Store extends Container {
		private store = initialState;
		private listeners = new Map<string, (val: T) => void>();
		private isHyDrated = false;

		constructor() {
			super();
			for (const key of Object.keys(initialState) as string[]) {
				Store.prototype[`set${capitalize(key)}`] = function (
					this: Store,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					v: any | ((v: any) => any),
				) {
					if (typeof v === 'function') {
						this.store = { ...this.store, [key]: v(this.store[key]) };
					} else {
						this.store = { ...this.store, [key]: v };
					}
					this.notify();
				};
			}
		}

		hydrate(state: SetTypeArg<T>): void {
			if (!this.isHyDrated) {
				if (typeof state === 'function') {
					this.store = state(this.store);
				} else {
					this.store = state;
				}
				this.isHyDrated = true;
			}
		}

		subscribe(cb: (val: T) => void) {
			const rand = String(Math.random());
			this.listeners.set(rand, cb);
			return () => {
				this.unSubScribe(rand);
			};
		}

		private unSubScribe(id: string) {
			this.listeners.delete(id);
		}

		private notify() {
			this.listeners.forEach((e) => e(this.store));
		}

		getState(): T {
			return this.store;
		}

		setBatch(state: SetTypeArg<T>) {
			if (typeof state === 'function') {
				this.store = state(this.store);
			} else {
				this.store = state;
			}
			this.notify();
		}
	}

	return new Store() as never;
};

export const useCustomStore = <T>(store: ReturnStoreType<T>): T => {
	const [x, setX] = useState(store.getState());
	useEffect(() => store.subscribe((val) => setX(val)), [store]);
	return x;
};
