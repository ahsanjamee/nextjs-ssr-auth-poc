import { applyDecorators, ArgumentsHost, createParamDecorator, UseGuards } from '@nestjs/common';
import { UserGuard } from './user.guard';

export const User = createParamDecorator((_, input: ArgumentsHost) => {
	const request = input.switchToHttp().getRequest();
	return request.user;
});

export const JwtRequired = () => applyDecorators(UseGuards(UserGuard));
