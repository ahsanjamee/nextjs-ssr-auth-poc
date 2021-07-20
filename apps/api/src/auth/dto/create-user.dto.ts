import { IsDefined, Length } from 'class-validator';
export class CreateUserDTO {
	@IsDefined({ message: 'a name is required' })
	name: string;

	@IsDefined({ message: 'password is required' })
	@Length(6, undefined, { message: 'password must be at least 6 characters' })
	password: string;
}
