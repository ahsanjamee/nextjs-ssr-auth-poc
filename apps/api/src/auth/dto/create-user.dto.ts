import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, Length } from 'class-validator';
export class CreateUserDTO {
	@ApiProperty()
	@IsDefined({ message: 'a name is required' })
	name: string;

	@ApiProperty()
	@IsDefined({ message: 'password is required' })
	@Length(6, undefined, { message: 'password must be at least 6 characters' })
	password: string;
}
