import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '../../../utils/serialize.decorator';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { UserService } from '../../services/user.service';

@Serialize
@Controller('user')
@ApiTags('User Operations')
export class UserController {
	constructor(private userService: UserService) {}

	@Post('sign-up')
	async signUp(@Body() body: CreateUserDTO): Promise<UserEntity> {
		return await this.userService.create(body);
	}

	@Post('login')
	async login(@Body() body: CreateUserDTO): Promise<{ token: string }> {
		return await this.userService.login(body);
	}
}
