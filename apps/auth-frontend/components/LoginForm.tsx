import { LockClosedIcon } from '@heroicons/react/solid';
import { FC, FormEventHandler } from 'react';

type Props = {
	handleSubmit: FormEventHandler<HTMLFormElement>;
};

export const LoginForm: FC<Props> = ({ handleSubmit }) => {
	return (
		<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
			<input type='hidden' name='remember' defaultValue='true' />
			<div className='rounded-md shadow-sm -space-y-px'>
				<div>
					<label htmlFor='name' className='sr-only'>
						User name
					</label>
					<input
						id='name'
						name='name'
						type='text'
						autoComplete='name'
						required
						className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
						placeholder='Username'
					/>
				</div>
				<div>
					<label htmlFor='password' className='sr-only'>
						Password
					</label>
					<input
						id='password'
						name='password'
						type='password'
						autoComplete='current-password'
						required
						className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
						placeholder='Password'
					/>
				</div>
			</div>

			<div>
				<button
					type='submit'
					className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
					<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
						<LockClosedIcon className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
					</span>
					Sign in
				</button>
			</div>
		</form>
	);
};
