import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '../jwt.service';

@Injectable()
export class UserGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}
	canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const bearer = request.headers['Authorization'] || request.headers['authorization'];
		if (!bearer) throw new HttpException('No Authorization headers present in request', 401);
		try {
			const token = bearer.split(' ')[1] as string;
			const { id } = this.jwtService.verify<{ id: string }>(token);
			request.user = id;
			return true;
		} catch (error) {
			throw new HttpException('Invalid token provided', 401);
		}
	}
}
