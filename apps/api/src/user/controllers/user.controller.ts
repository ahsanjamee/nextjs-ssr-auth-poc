import { JwtRequired, User } from '@auth-demo/jwt';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from '../../utils/serialize.decorator';
import { UserService } from '../services/user.service';

@Serialize
@ApiTags('Guarded User Operations')
@ApiBearerAuth()
@JwtRequired()
@Controller('private')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	async self(@User() id: string) {
		return await this.userService.getSelf(id);
	}
}
